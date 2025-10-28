import requestMethods from '../request-methods';

export const blobApi = {
  getUploadUri: {
    method: requestMethods.post,
    path: () => `/upload/uri`,
    okMessage: `Upload uri is fetched`,
  },
};
