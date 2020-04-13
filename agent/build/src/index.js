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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var dotenv_1 = require("dotenv");
dotenv_1.config();
var expressApp_1 = require("./expressApp");
var apiTypes_1 = require("./apiTypes");
var env_1 = require("../config/env");
var child_process_1 = require("child_process");
var path = require("path");
var constants_1 = require("./constants");
var fs = require("fs");
var configUtils_1 = require("./configUtils");
console.info('Agent starting...');
var axios = require("axios");
var repositoryId = 'server-info';
var url = "https://github.com/fosemberg/" + repositoryId + ".git";
var serverUrl = env_1.SERVER_HOST + ":" + env_1.SERVER_HTTP_PORT;
var getInfoFromRepositoryUrl = function (url) {
    console.log('getInfoFromGithubUrl:url', url);
    var urlArr = url.split('/');
    var repositoryName = urlArr.pop().replace(/\.git$/, '');
    var repositoryOwner = urlArr.pop();
    return { repositoryName: repositoryName, repositoryOwner: repositoryOwner };
};
var checkIsRepositoryExist = function (repositoryUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, repositoryOwner, repositoryName, repoPath;
    return __generator(this, function (_b) {
        // const {data: {repositoryUrl}} = response;
        console.info("Check repository: " + repositoryUrl);
        try {
            _a = getInfoFromRepositoryUrl(repositoryUrl), repositoryOwner = _a.repositoryOwner, repositoryName = _a.repositoryName;
            repoPath = path.join(constants_1.PATH_TO_REPOS, repositoryOwner, repositoryName);
            if (fs.existsSync(repoPath)) {
                return [2 /*return*/, true];
            }
        }
        catch (e) {
            return [2 /*return*/, false];
        }
        return [2 /*return*/];
    });
}); };
var downloadRepository = function (repositoryUrl) {
    console.log('downloadRepository:repositoryUrl', repositoryUrl);
    var repositoryOwner = getInfoFromRepositoryUrl(repositoryUrl).repositoryOwner;
    return new Promise(function (resolve, reject) {
        child_process_1.exec("mkdir -p " + constants_1.PATH_TO_REPOS + " &&\n      mkdir -p " + constants_1.PATH_TO_REPOS + "/" + repositoryOwner + " &&\n      cd " + constants_1.PATH_TO_REPOS + "/" + repositoryOwner + " &&\n    git clone " + repositoryUrl.replace(/https?(:\/\/)/, 'git$1') + " && \n    echo '" + configUtils_1.createMessageObjectString(constants_1.MESSAGE.REPOSITORY_CLONED) + "'", {}, function (error, stdOut) {
            return error
                ? reject(error)
                : resolve(stdOut);
        });
    });
};
var downloadRepositoryIfNeed = function (repositoryUrl) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, checkIsRepositoryExist(repositoryUrl)];
            case 1:
                if (!(_a.sent())) {
                    return [2 /*return*/, downloadRepository(repositoryUrl)];
                }
                return [2 /*return*/, constants_1.MESSAGE.REPOSITORY_ALREADY_EXIST];
        }
    });
}); };
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
expressApp_1.app.get('/build/:buildId/:repositoryUrl/:commitHash/:command', function (_a, res) {
    var params = _a.params, _b = _a.params, buildId = _b.buildId, repositoryUrl = _b.repositoryUrl, commitHash = _b.commitHash, command = _b.command;
    return __awaiter(void 0, void 0, void 0, function () {
        var startDate, generateBuildResponse;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.info('build: ', JSON.stringify(params));
                    res.json({ buildId: buildId, isAlive: true });
                    startDate = new Date().getTime();
                    generateBuildResponse = function () { return ({
                        buildId: buildId,
                        repositoryUrl: repositoryUrl,
                        commitHash: commitHash,
                        startDate: startDate,
                        endDate: new Date().getTime()
                    }); };
                    return [4 /*yield*/, downloadRepositoryIfNeed(repositoryUrl)
                            .then(function () {
                            var _a = getInfoFromRepositoryUrl(repositoryUrl), repositoryOwner = _a.repositoryOwner, repositoryName = _a.repositoryName;
                            child_process_1.exec("cd " + constants_1.PATH_TO_REPOS + "/" + repositoryOwner + "/" + repositoryName + " &&\n            git checkout -q " + commitHash + " &&\n            " + command, {}, function (error, stdOut) {
                                return error
                                    ? notifyBuildResult(__assign(__assign({}, generateBuildResponse()), { status: apiTypes_1.Status.fail, stdOut: String(error) })) &&
                                        console.error(error)
                                    : notifyBuildResult(__assign(__assign({}, generateBuildResponse()), { status: apiTypes_1.Status.success, stdOut: stdOut }));
                            });
                        })["catch"](function (error) {
                            console.error(error);
                            notifyBuildResult(__assign(__assign({}, generateBuildResponse()), { status: apiTypes_1.Status.fail, stdOut: String(error) }));
                        })];
                case 1:
                    _c.sent();
                    return [2 /*return*/];
            }
        });
    });
});
expressApp_1.app.listen(env_1.AGENT_PORT);
notifyStart();
