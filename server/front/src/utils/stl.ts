import {STL_MODE_NAME} from "./apiTypes";
import {SERVER_STATIC_URL} from "../config/env";


interface GenerateStlUrlProps {
  projectName: string,
  stlFileName?: string,
  stlModeName?: STL_MODE_NAME,
}

const stlsFolderName = 'stls'

export const generateStlUrl = (
  {
    projectName,
    stlModeName,
    stlFileName = `${stlModeName}.stl`,
  }: GenerateStlUrlProps
  ) => (
  `${SERVER_STATIC_URL}/projects/${projectName}/${stlsFolderName}/${stlFileName}`
)
