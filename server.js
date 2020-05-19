const express = require('express');
const path = require('path');
const { Server } = require('boardgame.io/server');
const { Urbaniste } = require('./urbaniste');

const PORT = process.env.HTTP_PORT || 4001;
const WS_PORT = process.env.WS_PORT || 8000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist', 'client')));

app.listen(PORT, () => {
  console.log(`Express server listening at port ${PORT}.`);
});

const server = Server({
  games: [Urbaniste]
});

server.run(WS_PORT);
