import {AxiosError, type AxiosRequestConfig, type AxiosResponse} from 'axios';
import {useRequestConfig} from '../hooks/auth/utils';
import type {HttpError, ProblemDetails, RequestResult} from './_requests/interfaces';
import {onRetry} from './_requests/utils';
import axiosInstance from './axiosInstance';

export interface ApiRequest {
  isBlob?: boolean;
  method: (
    instance: typeof axiosInstance,
    path: string,
    config: AxiosRequestConfig,
    body?: unknown
  ) => Promise<AxiosResponse>;
  path: (...args: any[]) => string;
  okMessage: string;
}

const requestInstance = async <T>(
  request: ApiRequest,
  args: any[],
  body?: any
): Promise<RequestResult<T> | ProblemDetails | HttpError> => {
  const {method, path} = request;

  const completePath = path(...args);
  if (completePath.includes('undefined')) {
    return {
      title: 'Argument Error',
      detail: `Path argument undefined: ${completePath}\nargs=[${args}]`,
      correlationId: 'none',
    } as ProblemDetails;
  }

  try {
    const config = await useRequestConfig(request);
    const response = await method(axiosInstance, completePath, config, body);

    const json = await response.data;
    return {result: json} as RequestResult<T>;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.headers) {
        const contentType = error.response.headers['content-type'];
        if (contentType && contentType.includes('application/problem+json')) {
          return error.response.data as ProblemDetails;
        } else {
          console.warn('The response does not contain a problem details object.');
        }
      }

      const status = error?.response?.status ?? 0;
      if (status === 401 || status === 403) {
        console.warn('Access token expired. Attempting to refresh.');
        const retryResult = await onRetry(request, args, body);
        if (retryResult) {
          return retryResult as RequestResult<T>;
        }
      }
      return {status, message: error.message} as HttpError;
    }
    return {
      status: -1,
      message: typeof error === 'string' ? error : 'Unexpected error',
    } as HttpError;
  }
};

export default requestInstance;
