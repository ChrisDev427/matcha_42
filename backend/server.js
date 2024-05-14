let express = require('express');
const http = require('http');
const multer = require('multer');

let app = express();
const server = http.createServer(app);

const cookieParser = require('cookie-parser');
const { setupWebSocket } = require('./utils/websockets');

const upload = multer({ dest: 'photos/tmp' });

require('dotenv').config();

//template engine

//static files

// //middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
const verifyToken = require('./middlewares/jwt');
const getLocationWithIp = require('./middlewares/getLocationWithIp');

// Configurez les WebSockets
const wss = setupWebSocket(server);

// Ping clients for their current location every 30 seconds
const { pingClientsForCurrentLocation } = require('./utils/websockets');
setInterval(() => {
	pingClientsForCurrentLocation(wss);
  }, 30000);


// routes
// app.get('/', (req, res) => {
	// console.log('ip= ', req.ip);
	// ipinfo.lookupIp("91.173.97.158").then((response) => {
	// 	console.log(response);
	// });
	// res.send('Hello World');
	// res.sendStatus(200).send(res);
	// res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
// });


app.post('/login', require('./utils/loginUser'), (req, res) => {});

app.post('/submit-form', require('./utils/createUser'), (req, res) => {});

app.post('/forgotPassword', require('./utils/forgotPassword'), (req, res) => {});

app.post('/resetPassword', require('./utils/resetPassword'), (req, res) => {});

app.post('/reSendEmail', require('./utils/reSendEmail'), (req, res) => {});

app.get('/verifyEmail', require('./utils/verifyEmail'), (req, res) => {});

app.post('/updateUser', verifyToken, getLocationWithIp, upload.array('photos'), require('./utils/updateUser'), (req, res) => {});

app.get('/profile/:username', verifyToken, getLocationWithIp, require('./utils/getUser'), (req, res) => {});

app.use(express.static('../frontend/dist'));


//start server
server.listen(8080, () => {
	  console.log('Server is running on port 8080');
});
