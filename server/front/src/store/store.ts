import {IClientBuildResult, IClientBuildDetailedResult, BuildId, CommitHash} from "../utils/apiTypes";

const SERVER_PORT = 3021;
const host = `http://localhost:${SERVER_PORT}`;

export const getAllBuildResults = (): Promise<IClientBuildResult[]> => {
  const url = 'get_build_results';
  const _url = `${host}/${url}`;
  return fetch(`${_url}`).then((res) => res.json());
};

export const getBuildDetailedResult = (buildId: BuildId): Promise<IClientBuildDetailedResult> => {
  const url = 'get_build_detailed_result';
  const _url = `${host}/${url}/${buildId}`;
  return fetch(`${_url}`).then((res) => res.json());
};

export const sendBuild = (commitHash: CommitHash, command: string): Promise<string> => {
  const url = 'build';
  const _url = `${host}/${url}/${commitHash}/${command}`;
  return fetch(`${_url}`).then((res) => res.json());
};