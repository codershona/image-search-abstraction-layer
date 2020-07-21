// Get Requirements and instatiate some of the :

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');

const mongoose = require('mongoose');

const Bing = require('node-bing-api')({accKey: 'cdf83e1981944b19b8b2c6b533e8475f'});

app.use(bodyParser.json());

app.use(cors());



