const express = require('express');
const  http = require('http');
const signale = require('signale');
const cors = require('cors');
const { corsOptions } = require('./helpers');
const { api } = require('./routes');

const PORT = process.env.PORT || 3000
const app = express();

app.use(cors(corsOptions))
const server = http.createServer(app)

server.listen(PORT, () => {
    signale.success(`Server on ${PORT}`)
})

app.use('/tienda', api)