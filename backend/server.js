let express = require('express');
let app = express();
const path = require('path');
const verifyToken = require('./middlewares/jwt');

require('dotenv').config();

//template engine

//static files
// app.use('/assets', express.static('public'));
// app.use('/js', express.static('views/pages/js'));
// app.use(express.static('../frontend/dist'));
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// //middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.get('/', verifyToken, (req, res) => {
	// res.send('Hello World');
	res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
});

app.get('/login', require('./utils/loginUser'), (req, res) => {});

app.post('/register', require('./utils/createUser'), (req, res) => {});


// const user = require('./models/User');

// req = {
// 	body: {
// 		username: "nomutilisateur",
// 		email: "Axe06@hotmail.fr",
// 		password: "MotDePasse123",
// 		firstname: "Jean",
// 		lastname: "Dupont"
// 	}
// };
// console.log(req);
// const createUser = require('./utils/createUser');
// try {
// 	createUser(req);
// }
// catch (error) {
// 	console.log("Error in createUser:", error);
// }





//start server
app.listen(8080, () => {
	  console.log('Server is running on port 8080');
});