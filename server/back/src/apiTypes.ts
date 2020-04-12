export enum Status {
  success ,
  fail,
  building,
}

export type RepositoryUrl = string;
export type BuildId = string;
export type CommitHash = string;
export type Command = string;
export type Date = number;

export interface IWithRepositoryId {
  repositoryId: string;
}

export interface IWithCommitHash {
  commitHash: CommitHash;
}

export interface IWithCommand {
  command: Command;
}

export interface IWithBuildId {
  buildId: BuildId;
}

export interface IWithStatus {
  status: Status;
}

export interface IWithStdOut {
  stdOut: string;
}

export interface IWithStartDate {
  startDate: Date;
}

export interface IWithEndDate {
  endDate: Date;
}

export interface IWithHost {
  host: string;
}

export interface IWithPort {
  port: number;
}

export interface IWithRepositoryUrl {
  repositoryUrl: string;
}

export interface IWithRepositoryOwner {
  repositoryOwner: string;
}

export interface IWithRepositoryName {
  repositoryName: string;
}

export interface IRepositoryInfo extends
  IWithRepositoryOwner,
  IWithRepositoryName
{}

export interface IBuildResponse extends
  IWithBuildId,
  IWithRepositoryUrl,
  IWithCommitHash,
  IWithStatus,
  IWithStdOut,
  IWithStartDate,
  IWithEndDate
{}

export interface IBuildRequest extends
  IWithBuildId,
  IWithRepositoryUrl,
  IWithCommitHash,
  IWithCommand
{}

export interface IClientBuildResult extends
  IWithBuildId,
  IWithStatus,
  IRepositoryInfo,
  IWithCommitHash
{}

export interface IClientBuildDetailedResult extends
  IWithBuildId,
  IWithStatus,
  IWithRepositoryUrl,
  IWithCommitHash,
  IWithCommand,
  IWithStdOut,
  IWithStartDate,
  IWithEndDate
{}

export enum TYPE {
  SUBSCRIBE = 'SUBSCRIBE',
  SUBSCRIPTION = 'SUBSCRIPTION',
  UNSUBSCRIPTION = 'UNSUBSCRIPTION',
  REQUEST = 'REQUEST',
  RESPONSE = 'RESPONSE',
  EVENT = 'EVENT'
};

export enum ACTION {
  START_BUILD = 'START_BUILD',
  BUILD_RESULT = 'BUILD_RESULT',
  BUILD_RESULTS = 'BUILD_RESULTS',
}

export interface Message<T = any> {
    type: TYPE;
    action: ACTION;
    body: T;
}