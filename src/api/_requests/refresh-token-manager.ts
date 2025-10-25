import useAuthTokenRefresh from '../../hooks/auth/use-auth-token-refresh';

let isRefreshing = false;
let refreshTokenPromise: Promise<string | null> | null = null;

export const refreshTokenManager = async (): Promise<string | null> => {
  if (isRefreshing) {
    // If a refresh is already in progress, return the same promise.
    return refreshTokenPromise!;
  }

  isRefreshing = true;
  refreshTokenPromise = new Promise<string | null>(async (resolve, reject) => {
    try {
      const {onRefreshToken} = useAuthTokenRefresh();
      const newAccessToken = await onRefreshToken();

      if (newAccessToken) {
        localStorage.setItem('accessToken', newAccessToken);
        resolve(newAccessToken);
      } else {
        reject(new Error('Failed to refresh token'));
      }
    } catch (error) {
      reject(error);
    } finally {
      isRefreshing = false;
      refreshTokenPromise = null; // Reset the promise for future calls.
    }
  });

  return refreshTokenPromise;
};
