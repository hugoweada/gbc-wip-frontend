import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from "@mui/joy/IconButton";
import {formatDate} from "date-fns";
import {Fragment} from "react";
import {fileDataApi} from "../api/file/file.ts";
import PrimaryButton from "../components/buttons/primary-button.tsx";
import SecondaryButton from "../components/buttons/secondary-button.tsx";
import CustomDialog from "../components/dialog/custom-dialog.tsx";
import ColumnStack from "../components/layout/column-stack.tsx";
import RowStack from "../components/layout/row-stack.tsx";
import Word from "../components/text/word.tsx";
import useRequest from "../hooks/api/use-request.ts";
import {useBoolean} from "../hooks/primitive/use-boolean.ts";
import type {FileMetadata} from "../interfaces/fileMetadata.ts";
import useDownloadFile from "./use-download-file.tsx";

const FileTableRow = (
  {fileMetadata, onUpdate}: { fileMetadata: FileMetadata, onUpdate: () => Promise<void> }) => {
  const {onRequest: onRequestRemove, isLoading: isRemoving} = useRequest();
  const onRemove = async (id: string) => {
    await onRequestRemove(fileDataApi.removeFile, [id], null, true);
    await onUpdate();
  }

  const {
    onDownload,
    isLoading: isDownloading,
  } = useDownloadFile()

  const sharingLink = `${import.meta.env['VITE_FRONTEND_URL']}/file/${fileMetadata.id}`
  const isOpenSharing = useBoolean(false);
  const {onRequest: onRequestSharing, isLoading: isSetSharing} = useRequest();
  const onSetSharing = async (isPublic: boolean) => {
    await onRequestSharing(fileDataApi.setFileIsPublic, [fileMetadata.id, isPublic], null, true);

    if (isPublic) {
      await navigator.clipboard.writeText(sharingLink);
    }

    await onUpdate()
  }

  return (
    <Fragment>
      <tr key={fileMetadata.id}>
        <td>{fileMetadata.fileName}</td>
        <td>{formatDate(fileMetadata.createdAt, 'yyyy MMM dd, HH:mm')}</td>
        <td>{(fileMetadata.size / 1024 / 1024).toPrecision(1)}</td>
        <td>
          <RowStack spacing={1}>
            <IconButton onClick={() => onRemove(fileMetadata.id)}
                        disabled={isRemoving}><DeleteIcon/></IconButton>
            <IconButton onClick={() => onDownload(fileMetadata)}
                        disabled={isDownloading}><DownloadIcon/></IconButton>
            <IconButton onClick={isOpenSharing.onTrue}
                        color={fileMetadata.isPublic ? 'primary' : 'neutral'}><ShareIcon/></IconButton>
          </RowStack>
        </td>
      </tr>
      <CustomDialog title={`Share ${fileMetadata.fileName}`} open={isOpenSharing.value} onClose={isOpenSharing.onFalse}>
        <ColumnStack>
          <Word>Anyone on the internet with the link can view</Word>

          <PrimaryButton onClick={() => onSetSharing(true)} disabled={isSetSharing}>
            Copy Link
          </PrimaryButton>
          {fileMetadata.isPublic &&
            <SecondaryButton onClick={() => onSetSharing(false)} disabled={isSetSharing}>
              Cancel Sharing
            </SecondaryButton>
          }
        </ColumnStack>
      </CustomDialog>
    </Fragment>
  )
}

export default FileTableRow
