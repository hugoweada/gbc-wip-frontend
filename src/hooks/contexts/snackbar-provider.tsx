import CopyAllIcon from '@mui/icons-material/CopyAll';
import {Snackbar} from '@mui/joy';
import IconButton from '@mui/joy/IconButton';
import type {SnackbarOrigin} from '@mui/joy/Snackbar';
import {createContext, type FC, type ReactElement, useCallback, useContext, useMemo, useState,} from 'react';
import PrimaryTooltip from '../../components/display/primary-tooltip';
import ColumnStack from '../../components/layout/column-stack';
import PrimaryBox from '../../components/layout/primary-box';
import RowStack from '../../components/layout/row-stack';
import Word from '../../components/text/word';

interface SnackbarProviderContextProps {
  notifySuccess: (title: string, message: string) => void;
  notifyError: (title: string, message: string) => void;
  notifyWarning: (title: string, message: string) => void;
  notifyInfo: (title: string, message: string) => void;
}

interface SnackbarState extends SnackbarOrigin {
  open: boolean;
  title: string;
  message: string;
  correlationId: string;
  severity: 'success' | 'danger' | 'warning' | 'neutral';
}

const SnackbarProviderContext = createContext<SnackbarProviderContextProps | undefined>(undefined);

export const useSnackbarProviderContext = (): SnackbarProviderContextProps => {
  const context = useContext(SnackbarProviderContext);

  if (!context) {
    throw new Error('useNotification must be used within a SnackbarProvider');
  }

  return context;
};

export const SnackbarProvider: FC<{ children: ReactElement }> = ({children}) => {
  const [snackbarState, setSnackbarState] = useState<SnackbarState>({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
    title: '',
    message: '',
    correlationId: '',
    severity: 'neutral',
  });

  const {open, vertical, horizontal, title, message, severity, correlationId} = snackbarState;

  const showSnackbar = useCallback(
    (
      severity: 'success' | 'danger' | 'warning' | 'neutral',
      title: string,
      message: string,
      correlationId?: string
    ) => {
      setSnackbarState({
        open: true,
        vertical: 'bottom',
        horizontal: 'right',
        title,
        message,
        severity,
        correlationId: correlationId || '',
      });
    },
    []
  );

  const handleClose = useCallback(() => {
    setSnackbarState((prev) => ({...prev, open: false}));
  }, []);

  const contextValue = useMemo(
    () => ({
      notifySuccess: (message: string, title: string, correlationId?: string) =>
        showSnackbar('success', title, message, correlationId),
      notifyError: (message: string, title: string, correlationId?: string) =>
        showSnackbar('danger', title, message, correlationId),
      notifyWarning: (message: string, title: string, correlationId?: string) =>
        showSnackbar('warning', title, message, correlationId),
      notifyInfo: (message: string, title: string, correlationId?: string) =>
        showSnackbar('neutral', title, message, correlationId),
    }),
    [showSnackbar]
  );

  const onCopyMessage = async () => {
    const text = [title, message, `correlationId: ${correlationId}`].join('\n');
    await navigator.clipboard.writeText(text);
  };

  return (
    <SnackbarProviderContext.Provider value={contextValue}>
      {children}
      <Snackbar
        variant="soft"
        color={severity}
        anchorOrigin={{vertical, horizontal}}
        open={open}
        onClose={handleClose}
        autoHideDuration={3000}
      >
        <ColumnStack alignY="center" spacing={0.5} sx={{width: '100%'}}>
          <RowStack alignX="spread">
            {title && <Word level="title-lg">{title}</Word>}
            {correlationId && (
              <PrimaryTooltip title={'Copy message to clipboard'}>
                <IconButton onClick={onCopyMessage}>
                  <CopyAllIcon/>
                </IconButton>
              </PrimaryTooltip>
            )}
          </RowStack>
          <PrimaryBox>
            {message.split('\n').map((line, i) => (
              <Word key={i}>{line}</Word>
            ))}
          </PrimaryBox>
        </ColumnStack>
      </Snackbar>
    </SnackbarProviderContext.Provider>
  );
};
