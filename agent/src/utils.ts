import { Response } from 'express';
import { exec } from 'child_process';
import { RESPONSE } from './config';

export const execCommand = (
  command: string,
  callbackOut = (x: any) => x,
  callbackErr = callbackOut,
  options = {}
) =>
  exec(command, options, (err: Error, out: string) =>
    err ? callbackErr(err) && console.log(err) : callbackOut(out)
  );

export const execCommandWithRes = (
  command: string,
  res: Response,
  callbackOut: (x: string) => string | string[] = (x: string) => x,
  callbackErr = RESPONSE.NO_ROUT(res),
  options = {}
) =>
  execCommand(
    command,
    (json) => res.json(callbackOut(json)),
    callbackErr,
    options
  );

export const arrayFromOut = (out: string): string[] =>
  out.split('\n').slice(0, -1);

export const getPage = (
  array: string[],
  pageSize: number = array.length,
  pageNumber: number = 1
) => array.splice((pageNumber - 1) * pageSize, pageSize);
