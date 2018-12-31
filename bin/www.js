let app = require('../server');
let debug = require('debug')('backend:server');
let http = require('http');

let port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

let server = http.createServer(app);

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

let expressServerUtils = require('express-server-utils')(server, port);
expressServerUtils.listen();
expressServerUtils.handleOnError();
expressServerUtils.handleOnListening();

const exitActions = [server.close];
expressServerUtils.handleShutDown(exitActions);