export enum Status {
  success,
  fail,
  building,
}

export type BuildId = string;
export type CommitHash = string;
export type Command = string;

export interface IWithBuildId {
  buildId: BuildId;
}

export interface IWithStatus {
  status: Status;
}

export interface IWithStdOut {
  stdOut: string;
}

export interface IBuild extends IWithBuildId, IWithStatus, IWithStdOut {}