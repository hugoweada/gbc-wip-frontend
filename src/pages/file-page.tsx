import {useParams} from "react-router";
import {fileDataApi} from "../api/file/file.ts";
import PrimaryButton from "../components/buttons/primary-button.tsx";
import ColumnStack from "../components/layout/column-stack.tsx";
import PrimaryBox from "../components/layout/primary-box.tsx";
import Word from "../components/text/word.tsx";
import useInitObject from "../hooks/api/use-init-object.ts";
import type {FileMetadata} from "../interfaces/fileMetadata.ts";
import useDownloadFile from "./use-download-file.tsx";

const FilePage = () => {
  const {id} = useParams();

  const {valueHook: fileMetadata} = useInitObject<FileMetadata>(fileDataApi.getFileMetadata, [id]);
  const {
    onDownload,
    isLoading: isDownloading,
  } = useDownloadFile()
  // @ts-ignore
  return (
    <PrimaryBox sx={{minHeight: '100vh', p: 4}}>
      <ColumnStack alignY={'center'}>
        <Word>{fileMetadata.value?.fileName}</Word>
        <PrimaryButton onClick={() => onDownload(fileMetadata.value!)}
                       disabled={isDownloading || fileMetadata.value === ''}>
          Download
        </PrimaryButton>
      </ColumnStack>
    </PrimaryBox>
  )
}

export default FilePage
