import {Request, Response} from 'express';
import {app} from './expressApp';
import {
  IBody,
  IParams,
  IWithUrl,
} from './types';
import {
  IWithCommand, IWithCommitHash, IWithRepositoryId, IWithStdOut,
  IWithBuildId,
  IWithStatus,
  IBuildResponse, Status, IBuildRequest,
} from './apiTypes';
import {arrayFromOut, execCommandWithRes} from './utils';
import {PORT} from './config';
import {DB_FULL_PATH} from "./config";
import * as WS from "ws";

const {
  PATH_TO_REPOS,
  MESSAGE,
  RESPONSE,
} = require('./config');
const {createMessageObjectString} = require('./configUtils');
const DataStore = require('nedb');

const axios = require(`axios`);

const repositoryId = 'server-info';
const AGENT_PORT = 3022;
const WS_PORT = 8022;

console.info('Server starting...');

const db = new DataStore({
  filename: DB_FULL_PATH,
  autoload: true,
});

const sendBuildRequestToAgent = ({buildId, repositoryId, commitHash, command}: IBuildRequest, type = `get`, body = {}) => {
  const host = `http://localhost:${AGENT_PORT}`;
  const url = 'build';
  const _url = `${host}/${url}/${buildId}/${repositoryId}/${commitHash}/${command}`;
  console.info(`sendBuildRequestToAgent: ${_url}`);
  return axios[type](_url, body)
    .then((response) => {
      console.info(type, _url);
      console.info('Agent is alive');
      console.info(response.data);
    })
    .catch((error) => {
      console.error(type, _url);
      console.error('Agent not response');
      console.error(error.response.data);
    });
};

// собирает и уведомляет о результатах сборки
app.get(
  '/build/:commitHash/:command',
  (
    {
      params, params: {commitHash, command},
    }: IParams<IWithCommitHash & IWithCommand>,
    res: Response
  ) => {
    console.info('build: ', JSON.stringify(params));

    db.insert(
      {commitHash, command, status: Status.building},
      (err, newDoc) => {
        sendBuildRequestToAgent({
          buildId: newDoc._id,
          repositoryId,
          commitHash,
          command
        })
      }
    );
  }
);

// сохранить результаты сборки.
// В параметрах: id сборки, статус, stdout и stderr процесса.
app.post(
  '/notify_build_result',
  (
    {
      body: build,
    }: IBody<IBuildResponse>,
    res: Response
  ) => {
    // send build to user

    const {buildId, status, stdOut, startDate, endDate} = build;

    console.info('notify_build_result', JSON.stringify(build));
    db.update({_id: buildId}, {$set: {status, stdOut, startDate, endDate}});
    res.json({buildId, isAlive: true});
  }
);

// отдать результаты сборки.
app.get(
  '/get_build_results/',
  (
    req: Request,
    res: Response
  ) => {
    db.find({}).sort({ startDate: -1 }).exec((err, buildResults) => {
      res.json(
        buildResults.map(({_id, status, commitHash}) => ({buildId: _id, status, commitHash}))
      );
    });
  }
);

// отдать результаты сборки.
app.get(
  '/get_build_detailed_result/:buildId',
  (
    {
      params: {buildId},
    }: IParams<IWithBuildId>,
    res: Response
  ) => {
    db.findOne({_id: buildId}).exec((err, buildResult) => {
      const {_id: buildId, ..._buildResult} = buildResult;
      res.json({..._buildResult, buildId});
    });
  }
);

console.info(`Server available on: http://localhost:${PORT}`);

app.listen(PORT);

//  WS

const enum TYPE {
  SUBSCRIBE = 'SUBSCRIPTION',
  UNSUBSCRIBE = 'UNSUBSCRIPTION',
  REQUEST = 'REQUEST',
  EVENT = 'EVENT',
  RESPONSE = 'RESPONSE',
}

const enum ACTION {
  BAR = 'bar',
  BAR_HISTORY = 'bar-history',
  DICTIONARY = 'dictionary',
  AUTH = 'auth',
  BUILD_DETAILS = 'BUILD_DETAILS',
  BUILDS = 'BUILDS',
}

const WSS = WS.Server;
const wss = new WSS({port: WS_PORT});

const sendMessage = (json) => {
  wss.clients.forEach(function each(client) {
    let outJson = JSON.stringify(json);
    client.send(outJson);
    console.log('Send: ' + outJson);
  });
};

wss.on('connection', function (socket) {
  console.log('Opened Connection 🎉');

  let json = JSON.stringify(RESPONSE.CONNECTED);
  socket.send(json);
  console.log('Sent: ' + json);

  // обработка приходящих сообщений
  // здесь нужно осущесвить подписки
  socket.on('message', function (message: string) {
    // {"type":"REQUEST","rid":3,"action":"dictionary","body":{}}
    console.log('Received: ' + message);
    let data = JSON.parse(message);
    let action = data.action;
    let type = data.type;

    switch (type) {
      case TYPE.SUBSCRIBE:
        switch (action) {
          case ACTION.BUILD_DETAILS:
            sendMessage({message: 'build-details'});
            break;
          case ACTION.BUILDS:
            sendMessage({message: 'builds'});
            break;
          case ACTION.BAR:
            sendMessage({message: 'bar'});
          default:
            sendMessage({message: 'unknown'})
        }
        break;
      case TYPE.REQUEST:
        switch (action) {
          case ACTION.BUILD_DETAILS:
            sendMessage(RESPONSE.AUTH);
            break;
          case ACTION.BUILDS:
            sendMessage({message: 'request on build details'});
            break;
          default:
            sendMessage({message: 'unknown'})
        }
        break;
      default:
        sendMessage({message: 'unknown'});
    }
  });

  socket.on('close', function () {
    console.log('Closed Connection');
    // clearInterval(interval.bar);
    // clearInterval(interval.rate);
  });

});