export const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const REFRESH_TOKEN_EXPIRY_KEY = 'refreshTokenExpiry';

const useAuthTokens = () => {
  const onGetAccessToken = async () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  };

  const onGetRefreshToken = async () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  };

  const onGetRefreshTokenExpiry = async () => {
    return localStorage.getItem(REFRESH_TOKEN_EXPIRY_KEY);
  };

  const onSetAccessToken = async (accessToken: string) => {
    await localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  };

  const onSetRefreshToken = async (refreshToken: string) => {
    await localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  };

  const onSetRefreshTokenExpiry = async (refreshTokenExpiry: string) => {
    await localStorage.setItem(REFRESH_TOKEN_EXPIRY_KEY, refreshTokenExpiry);
  };

  const onClearTokens = async () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_EXPIRY_KEY);
  };

  return {
    onGetAccessToken,
    onGetRefreshToken,
    onGetRefreshTokenExpiry,
    onSetAccessToken,
    onSetRefreshToken,
    onSetRefreshTokenExpiry,
    onClearTokens,
  };
};

export default useAuthTokens;
