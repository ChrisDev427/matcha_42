const User = require('../models/User');
const connectBdd = require('./connectBdd');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const path = require('path');

let interests = [];

async function updateUser(req, res){
	// console.log("req.files = ", req.files);
	// if (!req.body || Object.keys(req.body).length === 0)
	// {
	// 	return res.status(400).json({ message: "No data" });
	// }
	try {
		await connectBdd();
		const user = await User.findOne({_id: req.user.userId});
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
				if (!req.body.interests[i].startsWith("#"))
				{
					return res.status(400).json({ message: "Interest must start with #" });
				}
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
		if (req.files)
		{
			const nbPhotosInDB = user.photos.length;
			if (req.files.length + nbPhotosInDB > 5)
			{
				return res.status(400).json({ message: "You can't have more than 5 photos" });
			}
			const fs = require('fs');
			const { resizeImage, compressImageToUnder1MB, imageToBase64 } = require('./photosHandler');
			for (let i = 0; i < req.files.length; i++)
			{
				const photoPath = path.join(__dirname, "../" + req.files[i].path);
				// console.log("photoPath = ", photoPath);
				await resizeImage(photoPath, photoPath + "_resized", 500, 500);
				await compressImageToUnder1MB(photoPath + "_resized", photoPath + "_compressed");
				const newPhotoPath =  path.join(__dirname, "../photos/tmp/" + user.username + "_" + (i + (nbPhotosInDB + 1)) + ".jpg");
				fs.renameSync(photoPath + "_resized", newPhotoPath);
				const imageBase64 = await imageToBase64(newPhotoPath);
				user.photos.push(imageBase64);
				fs.rmSync(newPhotoPath);
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
		res.status(200).json({ message: "User updated" });
	} catch (error) {
		console.log("Error in updateUser", error);
		res.status(503).json({ message:  error.message });
	}
}

module.exports = updateUser;