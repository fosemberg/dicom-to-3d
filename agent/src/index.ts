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
import {AGENT_HOST, AGENT_PORT, SERVER_HOST, SERVER_HTTP_PORT} from '../config/env';

import {exec} from 'child_process';
import * as path from 'path';

import {MESSAGE, PATH_TO_REPOS, RESPONSE} from "./constants";
import * as fs from "fs";
import {createMessageObjectString} from "./configUtils";

console.info('Agent starting...');
const axios = require(`axios`);

const repositoryId = 'server-info';
const url = `https://github.com/fosemberg/${repositoryId}.git`;

const serverUrl = `${SERVER_HOST}:${SERVER_HTTP_PORT}`;

interface GitGubInfo {
  repoName: string;
  repoOwner: string;
}

const getInfoFromGithubUrl = (url: string): GitGubInfo => {
  console.log('getInfoFromGithubUrl:url', url);
  const urlArr = url.split('/');
  const repoName = urlArr.pop().replace(/\.git$/,'');
  const repoOwner = urlArr.pop();
  return {repoName, repoOwner};
}

const checkIsRepositoryExist = async (repositoryUrl: string): Promise<boolean> => {
  // const {data: {repositoryUrl}} = response;
  console.info(`Check repository: ${repositoryUrl}`);
  const {repoName, repoOwner} = getInfoFromGithubUrl(repositoryUrl);
  const repoPath = path.join(PATH_TO_REPOS, repoOwner, repoName);
  if (fs.existsSync(repoPath)) {
    return true;
  }
  return false;
};

const downloadRepository = (repositoryUrl: string): Promise<string | Error> => {
  console.log('downloadRepository:repositoryUrl', repositoryUrl);
  const {repoOwner} = getInfoFromGithubUrl(repositoryUrl);
  return new Promise((resolve, reject) => {
    exec(
      `mkdir -p ${PATH_TO_REPOS} &&
      mkdir -p ${PATH_TO_REPOS}/${repoOwner} &&
      cd ${PATH_TO_REPOS}/${repoOwner} &&
    git clone ${repositoryUrl.replace(/https?(:\/\/)/, 'git$1')} && 
    echo '${createMessageObjectString(MESSAGE.REPOSITORY_CLONED)}'`,
      {},
      (error: Error, stdOut: string) =>
        error
          ? reject(error)
          : resolve(stdOut)
    );
  });
};

const downloadRepositoryIfNeed = async (repositoryUrl: string): Promise<string | Error> => {
  if (!await checkIsRepositoryExist(repositoryUrl)) {
    return downloadRepository(repositoryUrl);
  }
  return MESSAGE.REPOSITORY_ALREADY_EXIST;
}

downloadRepositoryIfNeed(url)
  .then(console.log)
  .catch(console.error);

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
    // .then(({data:{}})downloadRepositoryIfNeed)
    // .then(checkIsRepositoryExist)
    // .then(downloadRepository)
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
  '/build/:buildId/:repositoryUrl/:commitHash/:command',
  async (
    {
      params, params: {buildId, repositoryUrl, commitHash, command},
    }: IParams<IBuildRequest>,
    res: Response
  ) => {
    console.info('build: ', JSON.stringify(params));
    res.json({buildId, isAlive: true});
    const startDate = new Date().getTime();
    await downloadRepositoryIfNeed(repositoryUrl);
    const {repoOwner, repoName} =  getInfoFromGithubUrl(repositoryUrl);
    exec(
      `cd ${PATH_TO_REPOS}/${repoOwner}/${repoName} &&
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
