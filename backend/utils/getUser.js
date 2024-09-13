const User = require('../models/User');
const connectBdd = require('./connectBdd');
let UserProfile = require('../models/userProfile');

async function getUser(req, res){
	await connectBdd();
	// console.log("req.params.username = ", req.params.username);
	const user = await User.findOne({username: req.params.username});
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}
	// console.log("user = ", user.username);
	userProfile = new UserProfile(user);
	// console.log("userProfile=", userProfile.getProfile());
	res.status(200).json({ user: userProfile.getProfile() });
}

module.exports = getUser;