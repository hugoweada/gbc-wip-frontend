import requestMethods from '../request-methods';

export const blobApi = {
  getUploadUri: {
    method: requestMethods.get,
    path: () => `/upload/uri`,
    okMessage: `Upload uri is fetched`,
  },
};
