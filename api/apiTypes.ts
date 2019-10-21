export enum Status {
  success ,
  fail,
  building,
}

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

export interface IBuildResponse extends
  IWithBuildId,
  IWithCommitHash,
  IWithStatus,
  IWithStdOut,
  IWithStartDate,
  IWithEndDate
{}

export interface IBuildRequest extends
  IWithBuildId,
  IWithRepositoryId,
  IWithCommitHash,
  IWithCommand
{}

export interface IClientBuildResult extends
  IWithBuildId,
  IWithStatus,
  IWithCommitHash
{}

export interface IClientBuildDetailedResult extends
  IWithBuildId,
  IWithStatus,
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

export interface Message {
    type: TYPE;
    action: ACTION;
    body: any;
}