"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var dotenv_1 = require("dotenv");
dotenv_1.config();
var expressApp_1 = require("./expressApp");
var apiTypes_1 = require("./apiTypes");
var constants_1 = require("./constants");
var WS = require("ws");
var env_1 = require("../config/env");
var MESSAGE = require('./constants').MESSAGE;
var createMessageObjectString = require('./configUtils').createMessageObjectString;
var DataStore = require('nedb');
var axios = require("axios");
var repositoryId = 'server-info';
console.info('Server starting...');
var db = new DataStore({
    filename: constants_1.DB_FULL_PATH,
    autoload: true
});
var sendBuildRequestToAgent = function (_a, agentUrl) {
    var buildId = _a.buildId, repositoryId = _a.repositoryId, commitHash = _a.commitHash, command = _a.command;
    var type = 'get';
    var body = {};
    var commandUrl = 'build';
    var _url = agentUrl + "/" + commandUrl + "/" + buildId + "/" + repositoryId + "/" + commitHash + "/" + command;
    console.info("sendBuildRequestToAgent: " + _url);
    changeAgentStatusByUrl(agentUrl, false);
    return axios[type](_url, body)
        .then(function (response) {
        console.info(type, _url);
        console.info('Agent is alive');
        console.info(response.data);
    })["catch"](function (error) {
        console.error(type, _url);
        console.error('Agent not response');
        console.error(error.response.data);
    });
};
var sendBuildRequestToAgentIfNeed = function (host, port) {
    if (buildRequests.length === 0) {
        makeAgentFree(host, port);
    }
    else {
        sendBuildRequestToAgent(buildRequests.pop(), generateUrl(host, port))["catch"](console.error);
    }
};
var sendMessage = function (message) {
    wss.clients.forEach(function each(client) {
        var outJson = JSON.stringify(message);
        client.send(outJson);
        console.log('Send: ' + outJson);
    });
};
var agents = {};
var buildRequests = [];
var generateUrl = function (host, port) { return host + ":" + port; };
var changeAgentStatusByUrl = function (url, isFree) {
    agents[url] = isFree;
    console.info("Agent: " + url + " {isFree: " + isFree + "}");
};
var changeAgentStatus = function (host, port, isFree) {
    changeAgentStatusByUrl(generateUrl(host, port), isFree);
};
var registryAgent = function (host, port) {
    console.info("Registry new agent: " + generateUrl(host, port));
    changeAgentStatus(host, port, false);
};
var makeAgentFree = function (host, port) {
    changeAgentStatus(host, port, true);
};
var getFreeAgent = function () {
    for (var agent in agents) {
        if (agents.hasOwnProperty(agent) && agents[agent]) {
            return agent;
        }
    }
    return false;
};
// собирает и уведомляет о результатах сборки
expressApp_1.app.get('/build/:commitHash/:command', function (_a, res) {
    var task = _a.params;
    console.info('build: ', JSON.stringify(task));
    var commitHash = task.commitHash, command = task.command;
    db.insert({ commitHash: commitHash, command: command, status: apiTypes_1.Status.building }, function (err, newDoc) {
        var buildRequest = {
            buildId: newDoc._id,
            repositoryId: repositoryId,
            commitHash: commitHash,
            command: command
        };
        var freeAgent = getFreeAgent();
        if (freeAgent) {
            sendBuildRequestToAgent(buildRequest, freeAgent)["catch"](console.error);
        }
        else {
            console.info("Add buildRequest: " + buildRequest + " to stack");
            buildRequests.push(buildRequest);
        }
        res.json(__assign(__assign({}, buildRequest), { status: apiTypes_1.Status.building }));
        sendMessage({
            type: apiTypes_1.TYPE.EVENT,
            action: apiTypes_1.ACTION.START_BUILD,
            body: __assign(__assign({}, buildRequest), { status: apiTypes_1.Status.building })
        });
    });
});
expressApp_1.app.post('/notify_agent', function (_a, res) {
    var _b = _a.body, host = _b.host, port = _b.port;
    registryAgent(host, port);
    res.json({ repositoryUrl: env_1.REPOSITORY_URL });
});
// сказать серверу, что он свободен
// освободить агента или дать ему новое задание
expressApp_1.app.post('/notify_agent_free', function (_a, res) {
    var _b = _a.body, host = _b.host, port = _b.port;
    sendBuildRequestToAgentIfNeed(host, port);
    res.json({ isAlive: true });
});
// сохранить результаты сборки и сообщить об этом клиента
// В параметрах: id сборки, статус, stdout и stderr процесса.1
expressApp_1.app.post('/notify_build_result', function (_a, res) {
    var build = _a.body;
    sendMessage({
        type: apiTypes_1.TYPE.EVENT,
        action: apiTypes_1.ACTION.BUILD_RESULT,
        body: build
    });
    var buildId = build.buildId, status = build.status, stdOut = build.stdOut, startDate = build.startDate, endDate = build.endDate;
    console.info('notify_build_result', JSON.stringify(build));
    db.update({ _id: buildId }, { $set: { status: status, stdOut: stdOut, startDate: startDate, endDate: endDate } });
    res.json({ buildId: buildId, isAlive: true });
});
// отдать результаты сборки.
expressApp_1.app.get('/get_build_results/', function (req, res) {
    db.find({}).sort({ startDate: 1 }).exec(function (err, buildResults) {
        res.json(buildResults.map(function (_a) {
            var _id = _a._id, status = _a.status, commitHash = _a.commitHash;
            return ({ buildId: _id, status: status, commitHash: commitHash });
        }));
    });
});
// отдать детализированный результат сборки.
expressApp_1.app.get('/get_build_detailed_result/:buildId', function (_a, res) {
    var buildId = _a.params.buildId;
    db.findOne({ _id: buildId }).exec(function (err, buildResult) {
        var buildId = buildResult._id, _buildResult = __rest(buildResult, ["_id"]);
        res.json(__assign(__assign({}, _buildResult), { buildId: buildId }));
    });
});
//  WS
var WSS = WS.Server;
var wss = new WSS({ port: env_1.SERVER_WS_PORT });
wss.on('connection', function (socket) {
    console.log('WS: Opened new connection');
    var json = createMessageObjectString(MESSAGE.CONNECTED);
    socket.send(json);
    console.log('Sent: ' + json);
    socket.on('close', function () {
        console.log('Closed Connection');
    });
});
expressApp_1.app.listen(env_1.SERVER_HTTP_PORT);
console.info("Server http API available on: http://localhost:" + env_1.SERVER_HTTP_PORT);
console.info("Server WS API available on: ws://localhost:" + env_1.SERVER_WS_PORT);
