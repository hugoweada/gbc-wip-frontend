import {useRequestConfig} from '../../hooks/auth/utils';
import axiosInstance from '../axiosInstance';
import type {ApiRequest} from '../request-instance';
import {refreshTokenManager} from './refresh-token-manager';

export const formatHttpStatusErrorMessage = (error: any): string => {
  switch (error?.response?.status) {
    case 400:
      return error?.response?.data?.message;
    case 401:
      return 'Do not have user permission, please login to your account';
    case 404:
      return 'Requested resource is not found on the server';
    case 405:
      return 'Request method is not allowed on the server';
    case 413:
      return 'Payload is too large';
    case 415:
      return 'Unsupported media type. Please check the upload format.';
    case 500:
      return 'Internal server error, please contact us to report the error.';
    default:
      console.error(error);
      return 'An unexpected error occurred';
  }
};

export const capitalizeFirstChar = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const formatOkMessage = (message: string) => {
  message = capitalizeFirstChar(message);
  if (!message.endsWith('.')) message += '.';
  return message;
};

export const onRetry = async (request: ApiRequest, args: any[], body?: any) => {
  const {method, path} = request;
  const completePath = path(...args);

  // Retry the original request with the new access token
  try {
    const newAccessToken = await refreshTokenManager();
    const config = await useRequestConfig(request);
    if (config.headers != null) {
      config.headers.Authorization = `Bearer ${newAccessToken}`; // Add the refreshed token
    }

    const retryResponse = await method(axiosInstance, completePath, config, body);
    const retryJson = await retryResponse.data;

    return {result: retryJson};
  } catch (retryError) {
    console.error('Retry failed with {error}', {error: retryError});
  }
  return null;
};
