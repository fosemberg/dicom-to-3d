import {PORT} from "./config";

const axios = require(`axios`);

const buildId = 2;
const repositoryId = `server-info`;
const hashCommit = 'master';
const command = 'node console.js';

const url = `https://github.com/fosemberg/${repositoryId}.git`;
const host = `http://localhost:${PORT}`;


const checkUrl = (url, type = `get`, body = {}) => {
  const _url = `${host}${url}`;
  return axios[type](_url, body)
    .then((response) => {
      console.log(type, _url);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(type, _url);
      console.log(error.response.data);
    });
};

checkUrl(`/build/${buildId}/${repositoryId}/${hashCommit}/${command}`)
  // .finally(() => checkUrl(`/api/repos/${repositoryId}/commits/master`))
  // .finally(() => checkUrl(`/api/repos/${repositoryId}/commits/master/diff`))
  // .finally(() => checkUrl(`/api/repos/${repositoryId}`))
  // .finally(() => checkUrl(`/api/repos/${repositoryId}/tree/master`))
  // .finally(() => checkUrl(`/api/repos/${repositoryId}/tree/master/src/pages`))
  // .finally(() => checkUrl(`/api/repos/${repositoryId}/blob/master/README.md`))
  // .finally(() => checkUrl(`/api/repos/${repositoryId}/blob/master/README2.md`))
  // .finally(() => checkUrl(`/api/repos/${repositoryId}/count`));
