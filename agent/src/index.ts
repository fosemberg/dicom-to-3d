import {Request, Response} from 'express';
import {app} from './expressApp';
import {IBody, IParams, IWithRepositoryId, IWithUrl,} from './types';
import {IWithCommand, IWithCommitHash, IBuildRequest, IBuildResponse, IWithBuildId, Status} from './apiTypes';
import {arrayFromOut, execCommandWithRes} from './utils';
import {PORT} from './config';

import {exec} from 'child_process';

console.info('Agent starting...')

const {
  PATH_TO_REPOS,
  MESSAGE,
  RESPONSE,
} = require('./config');
const {createMessageObjectString} = require('./configUtils');

const axios = require(`axios`);

// const url = `https://github.com/fosemberg/${repositoryId}.git`;

const SERVER_PORT = 3021;

const notifyBuildResult = ({buildId, status, stdOut}: IBuildResponse, type = 'post') => {
  const host = `http://localhost:${SERVER_PORT}`;
  const url = 'notify_build_result'
  const _url = `${host}/${url}`;
  console.log('notifyBuildResult', _url);
  return axios[type](_url, {buildId, status, stdOut})
    .then((response) => {
      console.info(type, _url);
      console.info('Server is alive');
      console.info(response.data);
    })
    .catch((error) => {
      console.error(type, _url);
      console.error('Server not response');
      console.error(error.response.data);
    });
};

// checkUrl(`/build/${buildId}/${repositoryId}/${hashCommit}/${command}`)

// собирает и уведомляет о результатах сборки
app.get(
  '/build/:buildId/:repositoryId/:commitHash/:command',
  (
    {
      params, params: {buildId, repositoryId, commitHash, command},
    }: IParams<IBuildRequest>,
    res: Response
  ) => {
    console.info('build: ', JSON.stringify(params));

    res.json({buildId, isAlive: true});
    exec(
      `cd ${PATH_TO_REPOS}/${repositoryId} &&
            git checkout -q ${commitHash} &&
            ${command}`,
      {},
      (error: Error, stdOut: string) =>
        error
          ? notifyBuildResult({
            buildId,
            status: Status.fail,
            stdOut: String(error)
          }) &&
          console.error(error)
          : notifyBuildResult({
            buildId,
            status: Status.success,
            stdOut
          })
    );
  }
);


console.info(`Agent available on: https://localhost:${PORT}`);

app.listen(PORT);