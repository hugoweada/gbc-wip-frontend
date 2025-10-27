import {blobApi} from "../../api/file/blob.ts";
import useRequest from "../api/use-request.ts";
import useObject from "../primitive/use-object.ts";

const useUploadBlob = () => {
  const {onRequest, isLoading} = useRequest<string>();
  const file = useObject<File>(null);

  const onUpload = async () => {
    if (file.value == null) return;

    try {
      const response = await onRequest(blobApi.getUploadUri, [], null, false);
      if (!response.result) {
        console.error("No upload URI received from the server.");
        return;
      }

      const blobUploadUri = response.result;
      const uploadResponse = await fetch(blobUploadUri, {
        method: "PUT",
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": file.value.type,
        },
        body: file.value,
      });

      if (!uploadResponse.ok) {
        console.error("Failed to upload file:", uploadResponse.statusText);
      }

      console.log("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return {
    file,
    isLoading,
    onUpload,
  };
};

export default useUploadBlob;
