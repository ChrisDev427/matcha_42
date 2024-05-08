const mongoose = require('mongoose');

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Connexion à MongoDB échouée !', err));

module.exports = mongoose;