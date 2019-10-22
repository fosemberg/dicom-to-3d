"use strict";
exports.__esModule = true;
var exec = require('child_process').exec;
var RESPONSE = require('./config').RESPONSE;
exports.execCommand = function (command, callbackOut, callbackErr, options) {
    if (callbackOut === void 0) { callbackOut = function (x) { return x; }; }
    if (callbackErr === void 0) { callbackErr = callbackOut; }
    if (options === void 0) { options = {}; }
    return exec(command, options, function (err, out) {
        return err ? callbackErr(err) && console.log(err) : callbackOut(out);
    });
};
exports.execCommandWithRes = function (command, res, callbackOut, callbackErr, options) {
    if (callbackOut === void 0) { callbackOut = function (x) { return x; }; }
    if (callbackErr === void 0) { callbackErr = RESPONSE.NO_ROUT(res); }
    if (options === void 0) { options = {}; }
    return exports.execCommand(command, function (json) { return res.json(callbackOut(json)); }, callbackErr, options);
};
exports.arrayFromOut = function (out) {
    return out.split('\n').slice(0, -1);
};
exports.getPage = function (array, pageSize, pageNumber) {
    if (pageSize === void 0) { pageSize = array.length; }
    if (pageNumber === void 0) { pageNumber = 1; }
    return array.splice((pageNumber - 1) * pageSize, pageSize);
};
