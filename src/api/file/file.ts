import requestMethods from '../request-methods';

export const fileDataApi = {
  getFileMetadata: {
    method: requestMethods.get,
    path: (id: string) => `/file?id=${id}`,
    okMessage: `File is fetched`,
  },
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
  setFileIsPublic: {
    method: requestMethods.patch,
    path: (id: string, isPublic: boolean) => `/file/share?id=${id}&isPublic=${isPublic}`,
    okMessage: `File sharing status is set`,
  },
};
