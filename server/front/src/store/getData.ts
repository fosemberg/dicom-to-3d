import {IClientBuildResult} from "../utils/apiTypes";

const SERVER_PORT = 3021;
const host = `http://localhost:${SERVER_PORT}`;

export const getAllBuildResults = (): Promise<IClientBuildResult[]> => {
  const url = 'get_build_results';
  const _url = `${host}/${url}`;
  return fetch(`${_url}`).then((res) => res.json());
};