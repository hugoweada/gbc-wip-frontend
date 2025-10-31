import {FileStatus} from "./fileStatus.ts";

export interface FileMetadata {
  id: string;
  createdAt: string;
  lastUpdatedAt: string;
  fileName: string;
  fileType: string;
  isPublic: boolean;
  size: number;
  status: FileStatus;
  userId: string;
}

