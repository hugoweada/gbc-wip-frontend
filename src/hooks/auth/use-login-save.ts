import {paths} from '../../routes/paths';
import {useUserContext} from '../contexts/user-context';
import {useRouter} from '../routes/use-router';
import useAuthTokens from './use-auth-tokens';

const useLoginSave = () => {
  const router = useRouter();
  const {setUserContext} = useUserContext();
  const {onSetAccessToken, onSetRefreshToken, onSetRefreshTokenExpiry} = useAuthTokens();

  return async (userInfo: any) => {
    setUserContext({
      userId: userInfo.userId,
      username: userInfo.userName,
      userRole: userInfo.userRole,
    });
    await Promise.all([
      onSetAccessToken(userInfo.accessToken),
      onSetRefreshToken(userInfo.refreshToken),
      onSetRefreshTokenExpiry(userInfo.refreshTokenExpiry),
    ]);

    if (userInfo.accessToken.length > 0) {
      router.push(paths.dashboard.root);
    }
  };
};

export default useLoginSave;
