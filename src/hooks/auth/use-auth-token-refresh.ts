import {BACKEND_URL} from '../../api/constants';
import useNotification from '../interaction/use-notification';
import useAuthTokens from './use-auth-tokens';

const useAuthTokenRefresh = () => {
  const {notifyWarning} = useNotification();
  const {onGetRefreshToken, onSetAccessToken} = useAuthTokens();

  const onRefreshToken = async () => {
    try {
      const refreshToken = await onGetRefreshToken(); // Get the refresh token

      if (!refreshToken) {
        notifyWarning('No refresh token available', 'Invalid Session');
        return;
      }

      const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({refreshToken}),
      });

      if (response.ok) {
        const data = await response.json();
        const newAccessToken = data.accessToken;
        await onSetAccessToken(newAccessToken);

        return newAccessToken;
      } else {
        console.error('Failed to refresh access token');
        return null;
      }
    } catch (error) {
      console.error('Refresh token request failed', {error});
      return null;
    }
  };

  return {onRefreshToken};
};

export default useAuthTokenRefresh;
