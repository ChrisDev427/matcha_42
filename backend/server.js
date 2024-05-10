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
app.get('/', (req, res) => {
	// res.send('Hello World');
	// res.sendStatus(200).send(res);
	res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


app.post('/login', require('./utils/loginUser'), (req, res) => {});

app.post('/submit-form', require('./utils/createUser'), (req, res) => {});

// app.get('/verify-email', require('./utils/verifyEmail'), (req, res) => {});

app.use(express.static('../frontend/dist'));


//start server
app.listen(8080, () => {
	  console.log('Server is running on port 8080');
});