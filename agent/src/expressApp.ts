const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
