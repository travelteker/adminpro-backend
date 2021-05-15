'use strict';

const express = require('express');
const { error, request, response } = require('express');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cors = require('cors');

const { load_file } = require('./environments/load_config');
const { dbConnection } = require('./database/link_mongo');
const { logger, shell, mongo } = require('./config/custom_logger');
const routes = require('./routes/index');
const { loggerRequest } = require('./middlewares/logger-request');
const { error404, handleErrors } = require('./middlewares/handler-error');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 1 minutes
  max: 40, // limit each IP to 40 requests per windowMs
  statusCode: 500,
  message: {
    blocked: true,
    description: 'Error, please contact with support',
  },
});

class ApiServer {
  constructor() {
    this.path_env = process.env.PATH_ENVIRONMENT || './src/environments';
    this.app = express();
    this.loggerConsole = logger(shell());
    this.loggerMongo;
  }

  start() {
    this.loader();
    this.loggerMongo = logger(mongo());
    this.dataBaseConnection();
    this.middlewares();
    this.routesIndex(error, request, response);
    this.listener();
  }

  loader() {
    load_file(this.path_env);
  }

  dataBaseConnection() {
    const linkMongo = process.env.DB_MONGO_LINK + '/' + process.env.DB_NAME;
    dbConnection(linkMongo);
  }

  middlewares() {
    // Parse json body in requests
    this.app.use(bodyParser.json());
    // Logger all requests
    this.app.use(loggerRequest);
    // Activar CORS
    this.app.use(cors());
    // Limit total request; apply to all requests
    this.app.use(limiter);
    // Parser Body JSON in Requests
    this.app.use(express.json());
  }

  routesIndex() {
    this.app.use('/', routes);
    this.app.use(error404);
    this.app.use(handleErrors);
  }

  listener() {
    const port = parseInt(process.env.PORT, 10) || 3000;
    const host = process.env.HOST || '127.0.0.1';

    this.app.listen(port, host, () => {
      this.loggerConsole.info(`Server listen on <${host}:${port}>`);
    });
  }
}

module.exports = new ApiServer();
