"use strict";
exports.__esModule = true;
var env_1 = require("./env");
var axios = require("axios");
var buildId = 2;
var repositoryId = "server-info";
var hashCommit = 'master';
var command = 'node console.js';
var url = "https://github.com/fosemberg/" + repositoryId + ".git";
var host = "http://localhost:" + env_1.AGENT_PORT;
var checkUrl = function (url, type, body) {
    if (type === void 0) { type = "get"; }
    if (body === void 0) { body = {}; }
    var _url = "" + host + url;
    return axios[type](_url, body)
        .then(function (response) {
        console.log(type, _url);
        console.log(response.data);
    })["catch"](function (error) {
        console.log(type, _url);
        console.log(error.response.data);
    });
};
checkUrl("/build/" + buildId + "/" + repositoryId + "/" + hashCommit + "/" + command);
