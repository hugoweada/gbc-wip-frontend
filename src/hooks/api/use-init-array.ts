import type {ApiRequest} from '../../api/request-instance';
import useArrayAsync, {type UseArrayAsyncReturn} from './base/use-array-async';
import useInit from './use-init';

const useInitArray = <T>(api: ApiRequest, params: any[] = []): UseArrayAsyncReturn<T> => {
  const {isLoading, valueHook, onUpdate, onUpdateByParams} = useArrayAsync<T>(api, params);

  useInit(onUpdate);
  return {
    isLoading,
    valueHook,
    onUpdate,
    onUpdateByParams,
  };
};

export default useInitArray;
