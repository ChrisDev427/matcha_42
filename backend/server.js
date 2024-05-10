let express = require('express');
let app = express();
const path = require('path');
const verifyToken = require('./middlewares/jwt');
const cookieParser = require('cookie-parser');

require('dotenv').config();

//template engine

//static files
app.use(cookieParser());

// //middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//routes
app.get('/', verifyToken, (req, res) => {
	// res.send('Hello World');
	res.sendStatus(200).send(res);
});


app.post('/login', require('./utils/loginUser'), (req, res) => {});

app.post('/RegisterPage', require('./utils/createUser'), (req, res) => {console.log("req= ", req.body);});


app.use(express.static('../frontend/dist'));


//start server
app.listen(8080, () => {
	  console.log('Server is running on port 8080');
});