const User = require('../models/User');
const connectBdd = require('./connectBdd');
let userProfile = require('../models/userProfile');

async function getUser(req, res){
	await connectBdd();
	// console.log("req.params.username = ", req.params.username);
	const user = await User.findOne({username: req.params.username});
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}
	// console.log("user = ", user.username);
	userProfile = new userProfile(user);
	console.log(userProfile);
	res.status(200).json({ user: userProfile });
}

module.exports = getUser;