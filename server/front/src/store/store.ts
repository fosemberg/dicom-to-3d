import {IClientBuildResult, IClientBuildDetailedResult, RepositoryUrl, BuildId, CommitHash} from "../utils/apiTypes";
import {SERVER_HOST, SERVER_HTTP_PORT} from "../config/env";

const hostUrl = `${SERVER_HOST}:${SERVER_HTTP_PORT}`;

export const getAllBuildResults = (): Promise<IClientBuildResult[]> => {
  const url = 'get_build_results';
  const _url = `${hostUrl}/${url}`;
  return fetch(`${_url}`).then((res) => res.json());
};

export const getBuildDetailedResult = (buildId: BuildId): Promise<IClientBuildDetailedResult> => {
  const url = 'get_build_detailed_result';
  const _url = `${hostUrl}/${url}/${buildId}`;
  return fetch(`${_url}`).then((res) => res.json());
};

export const sendBuild = (repositoryUrl: RepositoryUrl, commitHash: CommitHash, command: string): Promise<string> => {
  const url = 'build';
  const _url = `${hostUrl}/${url}/${encodeURIComponent(repositoryUrl)}/${commitHash}/${command}`;
  return fetch(`${_url}`).then((res) => res.json());
};