export type RequestComponentName = string;
export type RequestKeywords = string;
export type RequestAdvancedSearch = boolean;

interface SearchResponseSuccess {
  [key: string]: {
    [key: string]: {
      url: string,
      tables: {
        [key: string]: string
      },
      images: {
        [key: string]: string
      },
    }
  }
}

type SearchResponseError = false

export type SearchResponse = SearchResponseSuccess | SearchResponseError

export interface SearchRequest {
  name: RequestComponentName;
  keywords: RequestKeywords;
  advanced?: RequestAdvancedSearch;
}

export interface FileUploadRequest {
  files: Array<File>;
  projectName: string;
}

export type FileUploadResponse = boolean;

export type GetComponentNamesRequest = string;

export type ComponentNames = string[];

export interface GetComponentNamesResponse {
  names: ComponentNames;
}

export enum STL_MODE_NAME {
  BONE = 'bone',
  SKIN = 'skin',
  I128 = 'i128',
  SOFT = 'soft'
}
