import {
  ComponentNames,
  FileUploadRequest,
  FileUploadResponse,
  GetComponentNamesRequest,
  GetComponentNamesResponse,
  SearchRequest,
  SearchResponse
} from "../utils/apiTypes";
import {SERVER_HOST, SERVER_HTTP_PORT} from "../config/env";

const hostUrl = `${SERVER_HOST}:${SERVER_HTTP_PORT}`;

export const sendGetComponentNamesRequest = async (getComponentNamesRequest: GetComponentNamesRequest = ''): Promise<ComponentNames> => {
  const endpoint = 'all'
  const url = `${hostUrl}/${endpoint}`;

  try {
    const response = await fetch(
      `${url}`,
      {
        method: 'GET',
      }
    )
    const json: GetComponentNamesResponse = await response.json()
    return Array.from(new Set(json.names))
  } catch (error) {
    console.error(error)
    return []
  }
}

export const sendSearchRequest = async (searchRequest: SearchRequest): Promise<SearchResponse> => {
  const endpoint = 'search';
  const url = `${hostUrl}/${endpoint}`;
  try {
    const response = await fetch(
      `${url}`,
      {
        method: 'POST',
        body: JSON.stringify(searchRequest)
      }
    )
    return await response.json();
  } catch (error) {
    console.error(error)
    return false
  }
}

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
