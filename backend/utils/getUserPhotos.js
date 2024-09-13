const User = require('../models/User');
const connectBdd = require('./connectBdd');


async function getUserPhotos(req, res){
	try {
		await connectBdd();
		const user = await User.findOne({username: req.params.username});
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.set('Content-Type', user.photos[0].contentType);
		res.send(user.photos[0]);
	} catch (error) {
		console.log("error = ", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

module.exports = getUserPhotos;