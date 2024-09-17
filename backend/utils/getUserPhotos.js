const User = require('../models/User');
const connectBdd = require('./connectBdd');


async function getUserPhoto(req, res){
	try {
		const index = req.query.index;
		console.log('index:', index);
		await connectBdd();
		const user = await User.findOne({username: req.params.username});
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		// console.log('user.photos:', user.photos[0]);
		// console.log('user.photos.contentType:', user.photos[0].contentType);

		// res.set('Content-Type', user.photos[0].contentType);
		// res.set('Content-Type', 'image/png');
		const photo = user.photos[index];
		if (!photo) {
			return res.status(404).json({ message: "Photo not found" });
		}
		res.send(user.photos[index]);
	} catch (error) {
		console.log("error = ", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

module.exports = getUserPhoto;