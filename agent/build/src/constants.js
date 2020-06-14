"use strict";
exports.__esModule = true;
var path = require("path");
var configUtils_1 = require("./configUtils");
var env_1 = require("../config/env");
exports.PATH_TO_REPOS = path.join('repos', env_1.AGENT_NAME);
var MESSAGE;
(function (MESSAGE) {
    MESSAGE["NO_ROUT"] = "Rout not found.";
    MESSAGE["NO_REPOSITORY"] = "Can't download repository with this url. Maybe we have already got repository with this name or url is not correct";
    MESSAGE["REPOSITORY_DELETED"] = "repository successfully deleted";
    MESSAGE["REPOSITORY_CLONED"] = "repository successfully cloned";
    MESSAGE["REPOSITORY_ALREADY_EXIST"] = "repository already exist";
})(MESSAGE = exports.MESSAGE || (exports.MESSAGE = {}));
exports.RESPONSE = {
    NO_ROUT: function (res) { return function () {
        return res.status(404).json(configUtils_1.createMessageObject(MESSAGE.NO_ROUT));
    }; },
    NO_REPOSITORY: function (res) { return function () {
        return res.status(500).json(configUtils_1.createMessageObject(MESSAGE.NO_REPOSITORY));
    }; }
};
