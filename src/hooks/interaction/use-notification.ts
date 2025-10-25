import {useSnackbarProviderContext} from '../contexts/snackbar-provider';

interface UseNotification {
  notifySuccess: (message: string, title: string, correlationId?: string) => void;
  notifyError: (message: string, title: string, correlationId?: string) => void;
  notifyInfo: (message: string, title: string, correlationId?: string) => void;
  notifyWarning: (message: string, title: string, correlationId?: string) => void;
}

const useNotification = (): UseNotification => {
  return useSnackbarProviderContext();
};

export default useNotification;
