import {useCallback} from 'react';
import type {ApiRequest} from '../../../api/request-instance';
import useArray, {type UseArrayReturn} from '../../primitive/use-array';
import useRequest from '../use-request';

export interface UseArrayAsyncReturn<T> {
  isLoading: boolean;
  valueHook: UseArrayReturn<T>;
  onUpdate: () => Promise<void>;
  onUpdateByParams: (params: any) => Promise<void>;
}

const useArrayAsync = <T>(api: ApiRequest, params?: any): UseArrayAsyncReturn<T> => {
  const {onRequest, isLoading} = useRequest();
  const array = useArray<T>([]);

  const onGetArrayByParams = useCallback(
    async (newParams: any) => {
      const response = await onRequest(api, newParams, null, false);
      const result = Array.isArray(response?.result) ? response.result : [];
      array.onChangeValue(result);
    },
    [array, onRequest, api, params]
  );

  const onGetArray = useCallback(async () => {
    return await onGetArrayByParams(params);
  }, [onGetArrayByParams, params]);

  return {
    isLoading,
    valueHook: array,
    onUpdate: onGetArray,
    onUpdateByParams: onGetArrayByParams,
  };
};

export default useArrayAsync;
