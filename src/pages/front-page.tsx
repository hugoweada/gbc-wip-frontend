import {Grid, Table} from "@mui/joy";
import {fileDataApi} from "../api/file/file.ts";
import PrimaryButton from "../components/buttons/primary-button.tsx";
import SecondaryButton from "../components/buttons/secondary-button.tsx";
import ColumnStack from "../components/layout/column-stack.tsx";
import PrimaryBox from "../components/layout/primary-box.tsx";
import RowStack from "../components/layout/row-stack.tsx";
import Word from "../components/text/word.tsx";
import PrimaryUploadSingle from "../components/upload/primary-upload-single.tsx";
import useInitArray from "../hooks/api/use-init-array.ts";
import useUploadBlob from "../hooks/blobs/use-upload-blob.ts";
import type {FileMetadata} from "../interfaces/fileMetadata.ts";
import FileTableRow from "./file-table-row.tsx";

const FrontPage = () => {
  const {valueHook: fileMetadataList, onUpdate} = useInitArray<FileMetadata>(fileDataApi.getList, []);
  const {file, isLoading, onUpload} = useUploadBlob(onUpdate);


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
                <FileTableRow key={fileMetadata.id} fileMetadata={fileMetadata} onUpdate={onUpdate}/>
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
