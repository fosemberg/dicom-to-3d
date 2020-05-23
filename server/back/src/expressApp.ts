const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

import {STATIC_DIR} from "./constants";

export const app = express();
app.use(express.static('static'));
// to support JSON-encoded bodies
app.use(bodyParser.json());
// to support URL-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use('/static', express.static(STATIC_DIR))
