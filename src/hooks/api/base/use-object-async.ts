import {useCallback} from 'react';
import {ApiRequest} from '../../../api/request-instance';
import useObject, {UseObjectReturn} from '../../primitive/use-object';
import useRequest from '../use-request';

export type Callback<T> = (result: T | null) => void;

export interface UseObjectAsyncReturn<T> {
  isLoading: boolean;
  valueHook: UseObjectReturn<T>;
  onUpdate: () => Promise<void>;
  onUpdateByParams: (params: any) => Promise<void>;
}

const useObjectAsync = <T extends object>(
  api: ApiRequest,
  params?: any,
  callback?: Callback<T>
): UseObjectAsyncReturn<T> => {
  const {onRequest, isLoading} = useRequest();
  const object = useObject<T>(null);

  const onGetObject = useCallback(async () => {
    const response = await onRequest(api, params, null, false);

    const result = (response?.result as T) ?? null;
    object.onChangeValue(result);

    if (callback) {
      callback(result);
    }
  }, [object, onRequest, api, params, callback]);

  const onGetObjectByParams = useCallback(
    async (newParams: any) => {
      const response = await onRequest(api, newParams, null, false);

      const result = (response?.result as T) ?? null;
      object.onChangeValue(result);

      if (callback) {
        callback(result);
      }
    },
    [object, onRequest, api, params, callback]
  );

  return {
    isLoading,
    valueHook: object,
    onUpdate: onGetObject,
    onUpdateByParams: onGetObjectByParams,
  };
};

export default useObjectAsync;
