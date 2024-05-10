
async function likeUser(req, res) {
	require('./connectBdd');
	const User = require('../models/User');
	const { clients } = require('./websockets');
	// const clients = require('./path_to_your_websocket_clients_store');
	// console.log('req.query= ', req.query.user);
	user = await User.findOne({ username: req.query.user });
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}
	userliked = await User.findOne({ user: req.query.userliked });
	if (!userliked) {
		return res.status(404).json({ message: "User liked not found" });
	}
	userliked.likedBy.push(user);
	await userliked.save();
	res.status(200).json({ message: "User liked" });

	// Envoyer une notification via WebSocket si l'utilisateur "liké" est connecté
    const ws = clients.get(userliked._id.toString());
    if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
            type: 'notification',
            message: {
				title: 'like',
				body: user.username + ' liked you',
        }}));
    }
	userliked.notifications.push({
		title: 'like',
		body: user.username + ' liked you',
	});
}

module.exports = likeUser;