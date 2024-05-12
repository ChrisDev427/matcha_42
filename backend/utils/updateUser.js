const User = require('../models/User');
const connectBdd = require('./connectBdd');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let interests = [];

async function updateUser(req, res){
	try {
		await connectBdd();
		const user = await User.findOne({username: req.user});
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		if (req.body.firstName) {
			user.firstname = req.body.firstName;
		}
		if (req.body.lastName) {
			user.lastname = req.body.lastName;
		}
		if (req.body.email) {
			user.email = req.body.email;
			user.verified = false;
		}
		if (req.body.password) {
			const hash = await bcrypt.hash(req.body.password, saltRounds);
			user.password = hash;
		}
		if (req.body.biography) {
			user.biography = req.body.biography;
		}
		if (req.body.gender)
		{
			user.gender = req.body.gender;
		}
		if (req.body.sexualPreferences)
		{
			user.sexualPreferences = req.body.sexualPreferences;
		}
		if (req.body.age)
		{
			if (req.body.age < 18 || req.body.age > 100)
			{
				return res.status(400).json({ message: "Age must be between 18 and 100" });
			}
			user.age = req.body.age;
		}
		if (req.body.interests)
		{
			for (let i = 0; i < req.body.interests.length; i++)
			{
				if (!user.interests.includes(req.body.interests[i]))
				{
					user.interests.push(req.body.interests[i]);
					if (!interests.includes(req.body.interests[i]))
					{
						interests.push(req.body.interests[i]);
					}
				}
			}
		}
		if (req.body.photos)
		{
			const nbPhotosInDB = user.photos.length;
			if (req.body.photos.length + nbPhotosInDB > 5)
			{
				return res.status(400).json({ message: "You can't have more than 5 photos" });
			}
			const fs = require('fs');
			const { resizeImage } = require('./photosHandler');
			const { compresscompressImageToUnder1MB } = require('./photosHandler');
			const { imageToBase64 } = require('./photosHandler');
			for (let i = 0; i < req.body.photos.length; i++)
			{
				await resizeImage(req.body.photos[i], req.body.photos[i] + "_resized", 500, 500);
				await compresscompressImageToUnder1MB(req.body.photos[i] + "_resized", req.body.photos[i] + "_compressed");
				const photo = fs.renameSync(req.body.photos[i] + "_resized", user.username + "_" + (i + (nbPhotosInDB + 1)) + ".jpg");
				const imageBase64 = await imageToBase64(photo);
				user.photos.push(imageBase64);
			}
		}
		if (req.body.profilePicture)
		{
			if (req.body.profilePicture < 1 || req.body.profilePicture > user.photos.length)
			{
				return res.status(400).json({ message: "Invalid profile picture" });
			}
			user.profilePicture = req.body.profilePicture;
		}
		await user.save();
	} catch (error) {
		console.log("Error in updateUser", error);
		res.status(503).json({ message:  error.message });
	}
}

module.exports = updateUser;