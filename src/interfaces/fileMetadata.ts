import {FileStatus} from "./fileStatus.ts";

export interface FileMetadata {
  id: string;
  createdAt: string;
  lastUpdatedAt: string;
  fileName: string;
  fileType: string;
  size: number;
  status: FileStatus;
  userId: string;
}

