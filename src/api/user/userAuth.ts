import requestMethods from '../request-methods';

export const userAuthApi = {
  loginAccountByMicrosoft: {
    method: requestMethods.post,
    path: () => `/auth/login/microsoft`,
    okMessage: `Login is successful`,
  },
};
