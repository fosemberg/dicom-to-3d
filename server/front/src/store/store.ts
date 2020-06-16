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
    const json = await response.json()
    if (!!json.stdOut) {
      const {stdOut} = json
      return {
        state: "success",
        stdOut,
      }
    } else {
      const {error} = json
      console.error(error)
      return {
        state: "error",
        error,
      }
    }
  } catch (error) {
    console.error(error)
    return {
      state: "error",
      error,
    }
  }
}

export const sendUploadFileRequest2 = async ({files, projectName}: FileUploadRequest): Promise<FileUploadResponse> => {
  const endpoint = 'upload2'
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
    const json = await response.json()
    if (!!json.stdOut) {
      const {stdOut} = json
       return {
         state: "success",
         stdOut,
       }
    } else {
      const {error} = json
      console.error(error)
      return {
        state: "error",
        error,
      }
    }
  } catch (error) {
    console.error(error)
    return {
      state: "error",
      error,
    }
  }
}
