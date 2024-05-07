const mongoose = require('mongoose');

// Connexion à MongoDB
mongoose.connect('mongodb+srv://Axesnake:q0pJ29jyTGSmHBAS@cluster0.mpowtj7.mongodb.net/matcha?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Connexion à MongoDB échouée !', err));

module.exports = mongoose;