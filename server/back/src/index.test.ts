import {SERVER_HTTP_PORT} from "../config/env";

const axios = require(`axios`);

const buildId = 2;
const repositoryId = `server-info`;
const hashCommit = 'master';
const command = 'node console.js';

const host = `http://localhost:${SERVER_HTTP_PORT}`;


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

checkUrl(`/build/${buildId}/${repositoryId}/${hashCommit}/${command}`);
