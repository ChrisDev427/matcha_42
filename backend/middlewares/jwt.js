require('dotenv').config();
const connectBdd = require('../utils/connectBdd');

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // Clé secrète pour le access token
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET; // Clé secrète pour le refresh token

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log('authHeader= ', authHeader);
  const refreshToken = req.cookies.refreshToken; // Supposons que le refresh token soit envoyé via cookies

  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Bearer <token>
    jwt.verify(token, JWT_SECRET, async (err, user) => {
      if (err) {
        // console.log("refreshToken= ", refreshToken);
        if (err.name === "TokenExpiredError" && refreshToken) {
          // Vérifier le refresh token
          const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
          // console.log("decoded= ", decoded);
          if (!decoded) {
            return res.sendStatus(403); // Refresh token invalide
          }
          const User = require('../models/User');
          connectBdd();
          const storedTokenData = await User.findById(decoded.userId);  // Récupérer le token stocké

          if (!storedTokenData || storedTokenData.refreshToken !== refreshToken) {
            return res.sendStatus(403); // Refresh token non valide ou non correspondant
          }
          // Générer un nouvel access token
          const newAccessToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, { expiresIn: '10s' });
          res.json({accessToken : newAccessToken});
          req.user = decoded;
          next();
        } else {
          return res.status(403).json({ message: err.name }); // Autres erreurs pour l'access token
        }
      } else {
        req.user = user; // Access token toujours valide
        next();
      }
    });
  } else {
    res.sendStatus(401); // Aucun token fourni
  }
};

module.exports = verifyToken;
