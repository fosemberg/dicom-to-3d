import { config } from "dotenv"
config();
import {Response} from 'express';
import {app} from './expressApp';
import {IData, IParams, } from './types';
import {
  IBuildRequest,
  IBuildResponse,
  Status,
  IWithRepositoryUrl
} from './apiTypes';
import {AGENT_HOST, AGENT_PORT, SERVER_HOST, SERVER_HTTP_PORT} from './env';

import {exec} from 'child_process';

import {PATH_TO_REPOS} from "./config";

console.info('Agent starting...');
const axios = require(`axios`);

// const url = `https://github.com/fosemberg/${repositoryId}.git`;

const serverUrl = `${SERVER_HOST}:${SERVER_HTTP_PORT}`;

const checkIsRepositoryExist = (response: IData<IWithRepositoryUrl>): Promise<{isExist: boolean, repositoryUrl: string}> => {
  const {data: {repositoryUrl}} = response;
  console.info(`Check repository: ${repositoryUrl}`);
  return Promise.resolve({isExist: true, repositoryUrl});
};

const downloadRepository = ({isExist: boolean, repositoryUrl: string}): Promise<boolean> => {
  return Promise.resolve(true);
};

const notifyAgentFree = () => {
  const type = 'post';
  const url = 'notify_agent_free';
  const _url = `${serverUrl}/${url}`;
  console.log('notifyAgentFree', _url);
  return axios[type](_url, {host: AGENT_HOST, port: AGENT_PORT})
    .then((response) => {
      console.info(type, _url);
      console.info('Server is alive');
      // console.info(response);
    })
    .catch((error) => {
      console.error(type, _url);
      console.error('Server not response');
      console.error(error);
    });
};

const notifyStart = (type = 'post') => {
  console.info(`Agent available on: ${AGENT_HOST}:${AGENT_PORT}`);
  const url = 'notify_agent';
  const _url = `${serverUrl}/${url}`;
  return axios[type](_url, {host: AGENT_HOST, port: AGENT_PORT})
    .then(checkIsRepositoryExist)
    .then(downloadRepository)
    .then(notifyAgentFree)
    .catch((error) => {
      // console.error(type, _url);
      // console.error('Server not response');
      console.error(error);
    });
};

const notifyBuildResult = (buildResponse: IBuildResponse, type = 'post') => {
  const url = 'notify_build_result';
  const _url = `${serverUrl}/${url}`;
  console.log('notifyBuildResult', _url);
  notifyAgentFree().catch(console.error);
  return axios[type](_url, buildResponse)
    .then((response) => {
      console.info(type, _url);
      console.info('Server is alive');
      // console.info(response.data);
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
    const startDate = new Date().getTime();
    console.log(`cd ${PATH_TO_REPOS}/${repositoryId} &&
            git checkout -q ${commitHash} &&
            ${command}`);
    exec(
      `cd ${PATH_TO_REPOS}/${repositoryId} &&
            git checkout -q ${commitHash} &&
            ${command}`,
      {},
      (error: Error, stdOut: string) =>
        error
          ? notifyBuildResult({
            buildId,
            commitHash,
            status: Status.fail,
            stdOut: String(error),
            startDate,
            endDate: new Date().getTime()
          }) &&
          console.error(error)
          : notifyBuildResult({
            buildId,
            commitHash,
            status: Status.success,
            stdOut,
            startDate,
            endDate: new Date().getTime()
          })
    );
  }
);

app.listen(AGENT_PORT);
notifyStart();
