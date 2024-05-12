const connectBdd = require('./connectBdd');

async function verifyEmail(req, res){
	await connectBdd();
	const User = require('../models/User');
	const tokenEmail = req.query.token;
	if (!tokenEmail) {
		return res.status(400).json({ message: "token is required" });
	}
	const user = await User.findOne({ refreshToken: tokenEmail });
	if (!user) {
		return res.status(404).json({ message: "token not match" });
	}
	user.verified = true;
	user.tokenRefresh = null;
	await user.save();
	res.status(200).json({ message: "Email verified" });
}

module.exports = verifyEmail;