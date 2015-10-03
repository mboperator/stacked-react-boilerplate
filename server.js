require('dotenv').load();

import { startWebpackServer, getWebpackPort } from './services/webpack/utils';
import startExpressServer from './services/express';

const {
  PORT = 8080,
  HOST = 'localhost',
  NODE_ENV = 'development',
  } = process.env;

const webpackPort = getWebpackPort(PORT);

const curriedExpressSever = startExpressServer(`${__dirname}/fixtures`, PORT);
startWebpackServer(NODE_ENV, webpackPort, HOST, curriedExpressSever);
