"use strict";
exports.__esModule = true;
exports.SERVER_HOST = process.env.SERVER_HOST || 'http://localhost';
exports.SERVER_HTTP_PORT = Number(process.env.SERVER_HTTP_PORT) || 3021;
exports.AGENT_HOST = process.env.AGENT_HOST || 'http://localhost';
exports.AGENT_PORT = Number(process.env.AGENT_PORT) || 3024;
exports.AGENT_NAME = process.env.AGENT_NAME || 1;
