const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;  // La clé secrète utilisée pour signer les JWT

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];  // Bearer <token>

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Token invalide ou expiré
      }

      req.user = user;  // Attacher les infos de l'utilisateur à la requête
      next();  // Passer au prochain middleware
    });
  } else {
    res.sendStatus(401);  // Aucun token fourni
  }
};

module.exports = verifyToken;