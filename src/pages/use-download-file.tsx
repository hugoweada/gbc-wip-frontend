import {fileDataApi} from "../api/file/file.ts";
import useRequest from "../hooks/api/use-request.ts";
import type {FileMetadata} from "../interfaces/fileMetadata.ts";

const useDownloadFile = () => {
  const {onRequest: onRequestDownload, isLoading} = useRequest<string>();

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

  return {
    onDownload,
    isLoading,
  }
}

export default useDownloadFile;
