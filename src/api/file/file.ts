import requestMethods from '../request-methods';

export const fileDataApi = {
  getList: {
    method: requestMethods.get,
    path: () => `/file/list`,
    okMessage: `Files are fetched`,
  },
  removeFile: {
    method: requestMethods.delete,
    path: (id: string) => `/file?id=${id}`,
    okMessage: `File is removed`,
  },
  getFileUri: {
    method: requestMethods.get,
    path: (id: string) => `/file/uri?id=${id}`,
    okMessage: `File download is starting`,
  },
};
