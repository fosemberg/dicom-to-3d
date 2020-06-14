import {
  FileUploadRequest,
  FileUploadResponse,
} from "../utils/apiTypes";
import {SERVER_HOST, SERVER_HTTP_PORT} from "../config/env";

const hostUrl = `${SERVER_HOST}:${SERVER_HTTP_PORT}`;

export const sendUploadFileRequest = async ({files, projectName}: FileUploadRequest): Promise<FileUploadResponse> => {
  const endpoint = 'upload'
  const url = `${hostUrl}/${endpoint}/${projectName}`
  try {
    const formData = new FormData()
    for (const file of files) {
      formData.append("file", file)
    }

    let response = await fetch(url, {
      method: 'POST',
      body: formData,
      redirect: 'follow'
    })
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
