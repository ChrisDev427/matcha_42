const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const connectBdd = require('./connectBdd');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '15m';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRES_IN = '7d';

async function loginUser(req, res) {
    try {
		await connectBdd();
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Wrong Password" });
        }

		if (!user.verified) {
			return res.status(401).json({ message: "Email not verified" });
		}

        // Création du access token
        const accessToken = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        // Création du refresh token
        const refreshToken = jwt.sign(
            { userId: user._id },
            REFRESH_TOKEN_SECRET,
            { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
        );

		user.refreshToken = refreshToken;
		 // Séparation de la chaîne en latitude et longitude
        // if (req.body.location) {
        //     const latitude = parseFloat(req.body.location.split('Latitude: ')[1].split(',')[0]);
        //     const longitude = parseFloat(req.body.location.split('Longitude: ')[1]);
        //     user.location.coordinates = [latitude, longitude];
        //     user.location.authorization = true;
        // }
		user.connected = true;
		await user.save();

        // Envoyer les tokens au client
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 }); // 7 jours en millisecondes
        res.json({
            message: "Connexion réussie",
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Erreur de connexion:", error);
        res.status(500).json({ message: "Erreur du serveur lors de la tentative de connexion" });
    }
}

module.exports = loginUser;
