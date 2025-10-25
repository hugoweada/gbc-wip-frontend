import {userAuthApi} from "../../api/user/userAuth.ts";
import useRequest from "../../hooks/api/use-request.ts";
import {ACCESS_TOKEN_KEY} from "../../hooks/auth/use-auth-tokens.ts";
import useLoginSave from "../../hooks/auth/use-login-save.ts";

const useAuth = () => {
  const saveLoginResult = useLoginSave();
  const {onRequest, isLoading} = useRequest<null>();


  const onLogin = async (email: string, password: string) => {
    const body = {
      email,
      password,
    };
    const response = await onRequest(userAuthApi.loginAccountByMicrosoft, [], body, true);
    if (response?.result) {
      await saveLoginResult(response.result);
    }
  };

  return {
    isLoading,
    isAccessTokenExist: localStorage.getItem(ACCESS_TOKEN_KEY) != null,
    onLogin,
  };
};

export default useAuth;
