import type {AxiosRequestConfig} from 'axios';
import type {ApiRequest} from '../../api/request-instance';
import useAuthTokens from './use-auth-tokens';

export const useRequestConfig = async (request: ApiRequest): Promise<AxiosRequestConfig> => {
  const {onGetAccessToken} = useAuthTokens();
  const token = await onGetAccessToken();
  if (token == null) {
    console.warn(`Invalid token.`);
  }

  const responseType = request?.isBlob ? {responseType: 'blob' as const} : {};
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...responseType,
  };
};
