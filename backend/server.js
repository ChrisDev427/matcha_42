let express = require('express');
let app = express();
const mongoose = require('mongoose');
const path = require('path');

//template engine

//static files
// app.use('/assets', express.static('public'));
// app.use('/js', express.static('views/pages/js'));
app.use(express.static('../frontend/dist'));

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


app.get('*', (req, res) => {
  res.sendFile('../frontend/dist/index.html');
});


//start server
app.listen(8080, () => {
	  console.log('Server is running on port 8080');
});