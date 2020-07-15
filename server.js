const express = require('express');
const fs = require('fs');
var https = require('https');
const path = require('path');
const axios = require('axios');
const { Server } = require('boardgame.io/server');
const { Urbaniste } = require('./urbaniste');

const certificate = {
  cert: fs.existsSync('./cert/csr.pem') ? fs.readFileSync('./cert/csr.pem') : fs.readFileSync('./.cert/csr.pem'),
  key: [
    { 
      pem: fs.existsSync('./cert/privatekey.pem') ? fs.readFileSync('./cert/privatekey.pem') : fs.readFileSync('./.cert/privatekey.pem'),
      passphrase: 'urbaniste' 
    }
  ]
};

const PORT = process.env.HTTPS_PORT || 4001;
const WS_PORT = process.env.WS_PORT || 8000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist', 'client')));

https.createServer(certificate, app).listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '! Go to https://localhost/');
});

const server = Server({
  games: [Urbaniste],
  https: certificate
});

const httpsAgent = new https.Agent({ ...certificate, rejectUnauthorized: false });
server.app._io.on('connection', (socket) => {
  const { referer } = socket.handshake.headers;
  const [gameID, playerID, credentials] = referer.slice(referer.indexOf('/game') + 6).split('/');
  socket.on('disconnect', () => {
    axios.post(`https://127.0.0.1:8000/games/Urbaniste/${gameID}/leave`, { playerID, credentials }, { httpsAgent });
  });
});

server.run(WS_PORT);
