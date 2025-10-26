import {useMsal} from "@azure/msal-react";
import {loginRequest} from "../../constants/auth-config.ts";
import type {UserLoginSuccessInfo} from "../../interfaces/userLoginSuccessInfo.ts";
import useLoginSave from "./use-login-save.ts";

const useLoginMicrosoft = () => {
  const onSave = useLoginSave()
  const {instance} = useMsal();

  const onLogin = async () => {
    try {
      const response = await instance.loginPopup(loginRequest);
      const info: UserLoginSuccessInfo = {
        userId: response.account.localAccountId || '',
        userName: response.account.name || '',
        accessToken: response.accessToken,
        refreshToken: '',
      };
      console.log(response);
      await onSave(info);
    } catch (e) {
      console.error(e)
    }
  };

  return {
    onLogin
  }
}

export default useLoginMicrosoft;
