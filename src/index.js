'use strict';

const environ = require('dotenv');
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Variables de entorno en NodeJS >>> 'process.env'
const NODE_ENV = process.env.NODE_ENV || 'dev'

environ.config({
    path: `./src/environments/.env.${NODE_ENV}`
});


const app = express();
// Configurar CORS
app.use(cors());
// Conexión a BD
dbConnection();
const port = parseInt(process.env.PORT, 10) || 3000;
const host = process.env.HOST || '127.0.0.1'

// Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo!'
    })
});

app.listen(port, host, () => {
    console.log(`Servidor HTTP escuchando en <${host}:${port}>`);
});