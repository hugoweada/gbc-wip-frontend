import { paths } from '../../routes/paths';
import { useUserContext } from '../contexts/user-context';
import {useRouter} from "../routes/use-router.ts";
import useAuthTokens from './use-auth-tokens';

const useLogout = () => {
  const router = useRouter();
  const {  setUserContext } = useUserContext();
  const { onClearTokens } = useAuthTokens();

  const onLogout = async () => {
    await onClearTokens();
    await setUserContext({});

    router.push(paths.root);
  };

  return {
    onLogout,
  };
};

export default useLogout;
