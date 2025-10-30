import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import {Grid, Table} from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import {formatDate} from "date-fns";
import {fileDataApi} from "../api/file/file.ts";
import PrimaryButton from "../components/buttons/primary-button.tsx";
import SecondaryButton from "../components/buttons/secondary-button.tsx";
import ColumnStack from "../components/layout/column-stack.tsx";
import PrimaryBox from "../components/layout/primary-box.tsx";
import RowStack from "../components/layout/row-stack.tsx";
import Word from "../components/text/word.tsx";
import PrimaryUploadSingle from "../components/upload/primary-upload-single.tsx";
import useInitArray from "../hooks/api/use-init-array.ts";
import useRequest from "../hooks/api/use-request.ts";
import useUploadBlob from "../hooks/blobs/use-upload-blob.ts";
import type {FileMetadata} from "../interfaces/fileMetadata.ts";

const FrontPage = () => {
  const {file, isLoading, onUpload} = useUploadBlob();
  const {valueHook: fileMetadataList, onUpdate} = useInitArray<FileMetadata>(fileDataApi.getList, []);

  const {onRequest: onRequestRemove, isLoading: isRemoving} = useRequest();
  const onRemove = async (id: string) => {
    await onRequestRemove(fileDataApi.removeFile, [id], null, true);
    await onUpdate();
  }

  const {onRequest: onRequestDownload, isLoading: isDownloading} = useRequest<string>();
  const onDownload = async (fileMetadata: FileMetadata) => {
    const response = await onRequestDownload(fileDataApi.getFileUri, [fileMetadata.id], null, true);
    const fileUri = response.result;

    if (fileUri) {
      const fileResponse = await fetch(fileUri);
      if (!fileResponse.ok) {
        throw new Error(`Failed to fetch file: ${fileResponse.statusText}`);
      }
      const fileBlob = await fileResponse.blob();

      // Create a temporary download link
      const downloadUrl = URL.createObjectURL(fileBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;

      // Set the download attribute with the desired file name
      link.download = fileMetadata.fileName;

      // Programmatically trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up the temporary link
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
    } else {
      console.error('File URI is null');
    }
  }

  return (
    <PrimaryBox sx={{height: 'auto', minHeight: '100vh', px: 4}}>
      <Grid container spacing={4}>
        <Grid xs={12} lg={6}>
          <ColumnStack>
            <Word level={'h4'}>Upload</Word>
            <PrimaryUploadSingle
              value={file.value}
              onChangeValue={file.onChangeValue}
              onClear={() => file.onChangeValue(null)}
            />
            <PrimaryButton onClick={onUpload} disabled={isLoading}>Upload File</PrimaryButton>
            <Word>{isLoading && 'Uploading...'}</Word>
          </ColumnStack>
        </Grid>
        <Grid xs={12} lg={6}>
          <ColumnStack>
            <RowStack alignX={'spread'}>
              <Word level={'h4'}>Uploaded Files</Word>
              <SecondaryButton onClick={onUpdate}>Refresh</SecondaryButton>
            </RowStack>
            <Table>
              <thead>
              <tr>
                <th>Name</th>
                <th>Created</th>
                <th>Size (MB)</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              {fileMetadataList.value.map((fileMetadata) => (
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
                      <IconButton><ShareIcon/></IconButton>
                    </RowStack>
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
          </ColumnStack>
        </Grid>
      </Grid>
    </PrimaryBox>
  )
}

export default FrontPage;
