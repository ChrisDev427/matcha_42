const WebSocket = require('ws');
const url = require('url');
const User = require('../models/User');  // Assurez-vous que le chemin est correct
const connectBdd = require('./connectBdd'); // Assurez-vous que le chemin est correct

let clients = new Map();

function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', function connection(ws, req) {
        console.log('A new client Connected!');
        const location = url.parse(req.url, true);
        const userId = location.query.id;

        clients.set(userId, ws);
        ws.send('Welcome New Client!');

        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            ws.send(`Server received: ${message}`);
        });

        ws.on('close', () => {
            console.log('The client has disconnected.');
            disconnectUser(userId);
            clients.delete(userId);
        });

        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });

    async function disconnectUser(userId) {
        await connectBdd();
        let user = await User.findById(userId);
        user.connected = false;
        await user.save();
    }

    return wss;
}

module.exports = { setupWebSocket, clients };
