const WebSocket = require('ws');
const url = require('url');
const User = require('../models/User');
const likeUser = require('./like');
const viewedUser = require('./viewed');
const connectBdd = require('./connectBdd');

let clients = new Map();

async function setupWebSocket(server) {
    const wss = new WebSocket.Server({ server });
	// await connectBdd();
    wss.on('connection', function connection(ws, req) {
        console.log('A new client Connected!');
        const location = url.parse(req.url, true);
        const userId = location.query.id;
        console.log('userId = ', userId);

        clients.set(userId, ws);
        ws.send(JSON.stringify({type: 'connected', userId: userId, message: 'You are connected'}));

        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            // ws.send(`Server received: ${message}`);
			const parsedMessage = JSON.parse(message);
			if (parsedMessage.type === 'like')
			{
				likeUser(parsedMessage.userId, parsedMessage.message);
			}
			else if (parsedMessage.type === 'viewed')
			{
				viewedUser(parsedMessage.userId, parsedMessage.message);
			}
			// else if (parsedMessage.type === 'notification')
			// {
			// 	notification(parsedMessage.userId);
			// }
			// else if (parsedMessage.type === 'deleteNotification')
			// {
			// 	deleteNotification(parsedMessage.userId, parsedMessage.message);
			// }
			// else if (parsedMessage.type === 'chat')
			// {
			// 	chatUser(parsedMessage.userId, parsedMessage.message);
			// }
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
		if (!user) {
			return;
		}
        user.connected = false;
		user.lastConnection = new Date();
        await user.save();
    }

    return wss;
}

module.exports = { setupWebSocket, clients };
