import {
  FileUploadRequest,
  FileUploadResponse, GetProjectsResponse,
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

export const getProjects = async (): Promise<GetProjectsResponse> => {
  const endpoint = 'projects'
  const url = `${hostUrl}/${endpoint}`
  try {
    let response = await fetch(url, {
      method: 'GET',
    })
    const json = await response.json()
    if (!!json.projects) {
      const {projects} = json
      console.log('projects', projects)
      return {
        state: "success",
        projects,
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

console.log('getProjects()', getProjects())

