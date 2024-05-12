const connectBdd = require('./connectBdd');

async function likeUser(userId, message) {
	connectBdd();
	const User = require('../models/User');
	const { clients } = require('./websockets');
	let ws = clients.get(userId);
	if (!ws) {
		return;
	}

	user = await User.findOne({ username: message.user });
	if (!user) {
		ws.send(JSON.stringify({
					type: 'error',
					userId: userId,
					message: {
						title: 'user not found',
					}
				}));
		return;
	}
	userviewed = await User.findOne({ username: message.userviewed });
	if (!userviewed) {
		ws.send(JSON.stringify({
			type: 'error',
			userId: userId,
			message: {
				title: 'userviewed not found',
			}
		}));
		return;
	}
	userviewed.viewedBy.push(user);
	userviewed.fameRating += 2;

	const ws2 = clients.get(userviewed._id.toString());
    if (ws2 && ws2.readyState === WebSocket.OPEN) {
        ws2.send(JSON.stringify({
            type: 'notification',
            message: {
				title: 'viewed',
				user: user.username,
        }}));
    }

	userviewed.notifications.push({
		title: 'viewed',
		user: user.username,
	});
	await userviewed.save();
	ws.send(JSON.stringify({
		type: 'success',
		userId: userId,
		message: {
			title: 'viewed',
		}
	}));
}

module.exports = likeUser;