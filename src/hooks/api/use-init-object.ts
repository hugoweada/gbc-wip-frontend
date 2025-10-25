import {ApiRequest} from '../../api/request-instance';
import useObjectAsync, {Callback, UseObjectAsyncReturn} from './base/use-object-async';
import useInit from './use-init';

const useInitObject = <T extends object | any[]>(
  api: ApiRequest,
  params: any[] = [],
  callback?: Callback<T>
): UseObjectAsyncReturn<T> => {
  const {isLoading, valueHook, onUpdate, onUpdateByParams} = useObjectAsync<T>(
    api,
    params,
    callback
  );

  useInit(onUpdate);
  return {
    isLoading,
    valueHook,
    onUpdate,
    onUpdateByParams,
  };
};

export default useInitObject;
