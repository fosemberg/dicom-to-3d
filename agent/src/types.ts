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
export interface IFile {
  num: string;
  fileType: string;
  lastCommit: string;
  name: string;
  commitMessage: string;
  committer: string;
  updated: string;
}

export interface IWithBuildId {
  buildId: number;
}

export interface IWithCommand {
  command: string;
}