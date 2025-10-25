import {useCallback, useState} from 'react';
import {isHttpError, isProblemDetails, isRequestResult, type RequestResult,} from '../../api/_requests/interfaces';
import {formatHttpStatusErrorMessage, formatOkMessage} from '../../api/_requests/utils';
import requestInstance, {type ApiRequest} from '../../api/request-instance';
import useNotification from "../interaction/use-notification.ts";

const useRequest = <T>(): {
  isLoading: boolean;
  onRequest: (
    request: ApiRequest,
    args?: any,
    body?: any,
    isLogOk?: boolean
  ) => Promise<RequestResult<T>>;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const {notifySuccess, notifyError} = useNotification();

  const onRequest = useCallback(
    async (
      request: ApiRequest,
      args?: any[],
      body?: any,
      isLogResult: boolean = true
    ): Promise<RequestResult<T>> => {
      setIsLoading(true);

      const response = await requestInstance(request, args ?? [], body);
      if (isRequestResult(response)) {
        if (isLogResult && request.okMessage) {
          notifySuccess(formatOkMessage(request.okMessage), 'Action completed');
        }
      } else if (isProblemDetails(response)) {
        notifyError(response.detail, response.title, response.correlationId);
      } else if (isHttpError(response)) {
        const statusMessage = formatHttpStatusErrorMessage(response.status);
        notifyError(statusMessage, 'Http Error');
      } else {
        throw new Error(`Cannot parse response: ${response}`);
      }

      setIsLoading(false);
      return response;
    },
    [notifyError, notifySuccess]
  );

  return {
    onRequest,
    isLoading,
  };
};

export default useRequest;
