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
  IBuildResponse, Status, IBuildRequest, TYPE, ACTION, Message,
} from './apiTypes';
import {DB_FULL_PATH} from "./config";
import * as WS from "ws";
import {AGENT_PORT, SERVER_WS_PORT, SERVER_HTTP_PORT, repositoryUrl} from "./env";

const {
  MESSAGE,
} = require('./config');
const {createMessageObjectString} = require('./configUtils');
const DataStore = require('nedb');
const axios = require(`axios`);

const repositoryId = 'server-info';

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

const sendMessage = (message: Message) => {
  wss.clients.forEach(function each(client) {
    let outJson = JSON.stringify(message);
    client.send(outJson);
    console.log('Send: ' + outJson);
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
        const buildRequest: IBuildRequest = {
          buildId: newDoc._id,
          repositoryId,
          commitHash,
          command
        };
        sendMessage({
          type: TYPE.EVENT,
          action: ACTION.START_BUILD,
          body: {
            ...buildRequest,
            status: Status.building
          }
        });
        sendBuildRequestToAgent(buildRequest);
      }
    );
  }
);

export interface IWithPort {
  port: number;
}

export interface IWithRepositoryUrl {
  repositoryUrl: string;
}

type Agents = { [s: number]: boolean; };

const agents: Agents = {};

const registryAgent = (port: number) => {
  agents[port] = false;
}

const makeAgentFree = (port: number) => {
  agents[port] = true;
}

app.post(
  '/notify_agent',
  (
    {
      body: {
        port
      },
    }: IBody<IWithPort>,
    res: Response
  ) => {
    registryAgent(port);
    res.json({repositoryUrl});
  }
);

// сказать серверу, что он свободен
// освободить агента или дать ему новое задание
app.post(
  '/notify_agent_free',
  (
    {
      body: {
        port
      },
    }: IBody<IWithPort>,
    res: Response
  ) => {
    const tasks = []
    if (tasks.length === 0) {
      makeAgentFree(port);
    } else {
      res.json({task: 'DO something'});
    }
  }
);

// сохранить результаты сборки и сообщить об этом клиента
// В параметрах: id сборки, статус, stdout и stderr процесса.1
app.post(
  '/notify_build_result',
  (
    {
      body: build,
    }: IBody<IBuildResponse>,
    res: Response
  ) => {
    // send build to user

    sendMessage({
      type: TYPE.EVENT,
      action: ACTION.BUILD_RESULT,
      body: build,
    });

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
    db.find({}).sort({startDate: -1}).exec((err, buildResults) => {
      res.json(
        buildResults.map(({_id, status, commitHash}) => ({buildId: _id, status, commitHash}))
      );
    });
  }
);

// отдать детализированный результат сборки.
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

//  WS

const WSS = WS.Server;
const wss = new WSS({port: SERVER_WS_PORT});

wss.on('connection', function (socket) {
  console.log('WS: Opened new connection');

  let json = createMessageObjectString(MESSAGE.CONNECTED);
  socket.send(json);
  console.log('Sent: ' + json);

  socket.on('close', function () {
    console.log('Closed Connection');
  });
});

app.listen(SERVER_HTTP_PORT);

console.info(`Server available on: http://localhost:${SERVER_HTTP_PORT}`);