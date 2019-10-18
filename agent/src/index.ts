import {Request, Response} from 'express';
import {app} from './expressApp';
import {IBody, IParams, IWithCommand, IWithCommitHash, IWithRepositoryId, IWithUrl,} from './types';
import {IBuild, IWithBuildId, Status} from './apiTypes';
import {arrayFromOut, execCommandWithRes} from './utils';
import {PORT} from './config';

// import { exec } from 'child_process';
// exec(command, options, (err: Error, out: string) =>
//     err ? callbackErr(err) && console.log(err) : callbackOut(out)
//   );

console.info('Agent starting...')

const {
  PATH_TO_REPOS,
  MESSAGE,
  RESPONSE,
} = require('./config');
const { createMessageObjectString } = require('./configUtils');

const axios = require(`axios`);

// const url = `https://github.com/fosemberg/${repositoryId}.git`;

const SERVER_PORT = 3021;

const notifyBuildResult = ({buildId, status, stdOut}: IBuild, type = `get`, body = {}) => {
  const host = `http://localhost:${SERVER_PORT}`;
  const url = 'notify_build_result'
  const _url = `${host}/${url}/${buildId}/${status}/${stdOut}`;
  axios[type](_url, body)
  return stdOut;
    // .then((response) => {
    //   console.info(type, _url);
    //   console.info('Server is alive');
    //   console.info(response.data);
    // })
    // .catch((error) => {
    //   console.error(type, _url);
    //   console.error('Server not response');
    //   console.error(error.response.data);
    // });
};

// checkUrl(`/build/${buildId}/${repositoryId}/${hashCommit}/${command}`)

// собирает и уведомляет о результатах сборки
app.get(
  '/build/:buildId/:repositoryId/:commitHash/:command',
  (
    {
      params, params: { buildId, repositoryId, commitHash, command },
    }: IParams<IWithBuildId & IWithRepositoryId & IWithCommitHash & IWithCommand>,
    res: Response
  ) => {
    console.log(JSON.stringify(params));
    console.log(`command: ${command}`);
    execCommandWithRes(
      `cd ${PATH_TO_REPOS}/${repositoryId} &&
            git checkout -q ${commitHash} &&
            ${command}`,
      res,
      (res) => (
        notifyBuildResult({buildId, status: Status.success, stdOut: res})
      ),
      (error) => (
        notifyBuildResult({buildId, status: Status.fail, stdOut: error})
      )
    )
  }
);


console.info(`Agent available on: https://localhost:${PORT}`);

app.listen(PORT);