"use strict";
exports.__esModule = true;
exports.createMessageObject = function (str) { return ({ message: str }); };
exports.createMessageObjectString = function (str) {
    return JSON.stringify(exports.createMessageObject(str));
};
