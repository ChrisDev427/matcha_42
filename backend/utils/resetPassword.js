const User = require('../models/User');
const connectBdd = require('./connectBdd');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function resetPassword(req, res){
	try {
		console.log("req.body", req.body);
		// console.log("req.query", req.query);
		await connectBdd();
		const tokenEmail = req.body.token;
		const email = req.body.email;
		if (!tokenEmail || !email) {
			return res.status(400).json({ message: "token and email are required" });
		}
        const user = await User.findOne({email : email});
        if (!user) {
            return res.status(404).json({ message: "email not match" });
        }

		if (user.refreshToken !== tokenEmail) {
			return res.status(400).json({ message: "token not match" });
		}
		user.refreshToken = null;
		if (!req.body.password) {
			return res.status(400).json({ message: "password is required" });
		}
		const hash = await bcrypt.hash(req.body.password, saltRounds);
		user.password = hash;
		await user.save();
		res.status(200).json({ message: "Password updated" });
	}
	catch (error) {
		console.log("Error in forgotPassword", error);
		res.status(503).json({ message: error.message });
	}
}

module.exports = resetPassword;