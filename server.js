const express = require('express');
const fs = require('fs');
var https = require('https');
const path = require('path');
const { Server } = require('boardgame.io/server');
const { Urbaniste } = require('./urbaniste');

const certificate = {
  cert: fs.readFileSync('./cert/csr.pem'),
  key: [
    { pem: fs.readFileSync('./cert/privatekey.pem'), passphrase: 'urbaniste' }
  ]
};

const PORT = process.env.HTTPS_PORT || 443;
const WS_PORT = process.env.WS_PORT || 8000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist', 'client')));

https.createServer(certificate, app).listen(PORT, function () {
  console.log('Example app listening on port 3000! Go to https://localhost/')
});

const server = Server({
  games: [Urbaniste],
  https: certificate
});

server.run(WS_PORT);
