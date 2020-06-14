"use strict";
exports.__esModule = true;
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
exports.app = express();
exports.app.use(express.static('static'));
// to support JSON-encoded bodies
exports.app.use(bodyParser.json());
// to support URL-encoded bodies
exports.app.use(bodyParser.urlencoded({
    extended: true
}));
exports.app.use(cors());
