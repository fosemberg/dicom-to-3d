import {BuildId, Command, CommitHash, Status} from "./apiTypes";

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
  commitHash: CommitHash;
}

export interface IWithCommand {
  command: Command;
}
