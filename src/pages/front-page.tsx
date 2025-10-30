import PrimaryButton from "../components/buttons/primary-button.tsx";
import ColumnStack from "../components/layout/column-stack.tsx";
import PrimaryBox from "../components/layout/primary-box.tsx";
import Word from "../components/text/word.tsx";
import PrimaryUploadSingle from "../components/upload/primary-upload-single.tsx";
import useUploadBlob from "../hooks/blobs/use-upload-blob.ts";

const FrontPage = () => {
  const {file, isLoading, onUpload} = useUploadBlob();

  return (
    <PrimaryBox sx={{height: '100vh'}}>
      <PrimaryBox sx={{width: '50vw'}}>
        <ColumnStack>
          <PrimaryUploadSingle
            value={file.value}
            onChangeValue={file.onChangeValue}
            onClear={() => file.onChangeValue(null)}
          />
          <PrimaryButton onClick={onUpload} disabled={isLoading}>Upload File</PrimaryButton>
          <Word>{isLoading && 'Uploading...'}</Word>
        </ColumnStack>
      </PrimaryBox>
    </PrimaryBox>
  )
}

export default FrontPage;
