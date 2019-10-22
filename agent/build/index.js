"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
dotenv_1.config();
var expressApp_1 = require("./expressApp");
var apiTypes_1 = require("./apiTypes");
var env_1 = require("./env");
var child_process_1 = require("child_process");
var config_1 = require("./config");
console.info('Agent starting...');
var axios = require("axios");
// const url = `https://github.com/fosemberg/${repositoryId}.git`;
var serverUrl = env_1.SERVER_HOST + ":" + env_1.SERVER_HTTP_PORT;
var checkIsRepositoryExist = function (response) {
    var repositoryUrl = response.data.repositoryUrl;
    console.info("Check repository: " + repositoryUrl);
    return Promise.resolve({ isExist: true, repositoryUrl: repositoryUrl });
};
var downloadRepository = function (_a) {
    var boolean = _a.isExist, string = _a.repositoryUrl;
    return Promise.resolve(true);
};
var notifyAgentFree = function () {
    var type = 'post';
    var url = 'notify_agent_free';
    var _url = serverUrl + "/" + url;
    console.log('notifyAgentFree', _url);
    return axios[type](_url, { host: env_1.AGENT_HOST, port: env_1.AGENT_PORT })
        .then(function (response) {
        console.info(type, _url);
        console.info('Server is alive');
        // console.info(response);
    })["catch"](function (error) {
        console.error(type, _url);
        console.error('Server not response');
        console.error(error);
    });
};
var notifyStart = function (type) {
    if (type === void 0) { type = 'post'; }
    console.info("Agent available on: " + env_1.AGENT_HOST + ":" + env_1.AGENT_PORT);
    var url = 'notify_agent';
    var _url = serverUrl + "/" + url;
    return axios[type](_url, { host: env_1.AGENT_HOST, port: env_1.AGENT_PORT })
        .then(checkIsRepositoryExist)
        .then(downloadRepository)
        .then(notifyAgentFree)["catch"](function (error) {
        // console.error(type, _url);
        // console.error('Server not response');
        console.error(error);
    });
};
var notifyBuildResult = function (buildResponse, type) {
    if (type === void 0) { type = 'post'; }
    var url = 'notify_build_result';
    var _url = serverUrl + "/" + url;
    console.log('notifyBuildResult', _url);
    notifyAgentFree()["catch"](console.error);
    return axios[type](_url, buildResponse)
        .then(function (response) {
        console.info(type, _url);
        console.info('Server is alive');
        // console.info(response.data);
    })["catch"](function (error) {
        console.error(type, _url);
        console.error('Server not response');
        console.error(error.response.data);
    });
};
// checkUrl(`/build/${buildId}/${repositoryId}/${hashCommit}/${command}`)
// собирает и уведомляет о результатах сборки
expressApp_1.app.get('/build/:buildId/:repositoryId/:commitHash/:command', function (_a, res) {
    var params = _a.params, _b = _a.params, buildId = _b.buildId, repositoryId = _b.repositoryId, commitHash = _b.commitHash, command = _b.command;
    console.info('build: ', JSON.stringify(params));
    res.json({ buildId: buildId, isAlive: true });
    var startDate = new Date().getTime();
    child_process_1.exec("cd " + config_1.PATH_TO_REPOS + "/" + repositoryId + " &&\n            git checkout -q " + commitHash + " &&\n            " + command, {}, function (error, stdOut) {
        return error
            ? notifyBuildResult({
                buildId: buildId,
                commitHash: commitHash,
                status: apiTypes_1.Status.fail,
                stdOut: String(error),
                startDate: startDate,
                endDate: new Date().getTime()
            }) &&
                console.error(error)
            : notifyBuildResult({
                buildId: buildId,
                commitHash: commitHash,
                status: apiTypes_1.Status.success,
                stdOut: stdOut,
                startDate: startDate,
                endDate: new Date().getTime()
            });
    });
});
expressApp_1.app.listen(env_1.AGENT_PORT);
notifyStart();
