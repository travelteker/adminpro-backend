'use strict';
 
const express = require('express');
const cors = require('cors');

const { load_file } = require('./environments/load_config');
const { dbConnection } = require('./database/link_mongo');
const { logger, shell, mongo } = require('./config/custom_logger');
const routes = require('./routes/index');


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
        this.routesIndex();
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
        // Activar CORS
        this.app.use(cors());
        // Parser Body JSON in Requests
        this.app.use(express.json());
    }

    routesIndex() {
        this.app.use('/', routes);
    }

    listener() {
        const port = parseInt(process.env.PORT, 10) || 3000;
        const host = process.env.HOST || '127.0.0.1'
        this.app.listen(port, host, () => {
            this.loggerConsole.info(`Server listen on <${host}:${port}>`);
        });
    }

}

module.exports = new ApiServer();