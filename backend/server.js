let express = require('express');
let app = express();
const mongoose = require('mongoose');

//template engine

//static files
// app.use('/assets', express.static('public'));
// app.use('/js', express.static('views/pages/js'));

// //middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.get('/', (req, res) => {
})

// Connexion à MongoDB
mongoose.connect('mongodb+srv://Axesnake:q0pJ29jyTGSmHBAS@cluster0.mpowtj7.mongodb.net/matcha?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Connexion à MongoDB échouée !', err));

const user = require('./models/User');

// // Création de l'utilisateur test
// const newUser = new user({
//   firstName: "Jean",
//   lastName: "Dupont",
//   email: "jeandupont@example.com",
//   gender: "Male",
//   sexualPreferences: "Female",
//   biography: "Bonjour, je suis passionné de musique et de voyages.",
//   interests: ["#musique", "#voyage", "#photographie"],
//   photos: ["./photos/jeandupont@example.com/IMG_1095.jpg", "./photos/jeandupont@example.com/IMG_1096.jpg"],
//   profilePicture: "./photos/jeandupont@example.com/IMG_1095.jpg",
//   location: {
// 	coordinates: [2.3488, 48.8534] // Longitude, Latitude de Paris, par exemple
//   }
// });

// try {
//   newUser.save();
//   console.log('Utilisateur créé avec succès !');
// } catch (error) {
//   console.log('Erreur lors de la création de l utilisateur :', error.message);
// }

// Recherche de l'utilisateur test
user.findOne({ email: "jeandupont@example.com" })
.then((user) => {
  console.log(user);
})


//start server
app.listen(8080, () => {
	  console.log('Server is running on port 8080');
});