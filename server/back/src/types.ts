import {Status} from "./apiTypes";

export interface IParams<T> {
  params: T;
}

export interface IBody<T> {
  body: T;
}
export interface IWithRepositoryId {
  repositoryId: string;
}

export interface IWithUrl {
  url: string;
}

export interface IWithCommitHash {
  commitHash: string;
}

export interface IWithBuildId {
  buildId: number;
}

export interface IWithStatus {
  status: Status;
}

export interface IWithOut {
  out: string;
}

export interface IWithCommand {
  command: string;
}

