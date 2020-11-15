const http = require('http');
const path = require('path');
const express = require('express');

let wss;
let server;
const app = express();
app.use(express.static(path.join(__dirname, './client/build')));

server = new http.createServer(app);

server.on('error', err => console.log('Server error:', err));
server.listen(5000);
