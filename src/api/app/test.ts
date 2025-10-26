import requestMethods from '../request-methods';

export const testApi = {
  test: {
    method: requestMethods.get,
    path: () => `/app/test`,
    okMessage: `Test is successful`,
  },
};
