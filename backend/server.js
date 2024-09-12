let express = require('express');
const http = require('http');
const WebSocket = require('ws');
const multer = require('multer');

let app = express();
const server = http.createServer(app);

const path = require('path');
const cookieParser = require('cookie-parser');
const { setupWebSocket } = require('./utils/websockets');
const verifyToken = require('./middlewares/jwt');

const photosHandler = require('./utils/photosHandler');
const upload = multer({ dest: 'photos/tmp' });

require('dotenv').config();

//template engine


//static files
app.use('/assets', express.static('../frontend/dist/src'));
// //middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Configurez les WebSockets
const wss = setupWebSocket(server);

//routes
app.get('/', (req, res) => {
	// res.send('Hello World');
	// res.sendStatus(200).send(res);
	res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.get('/verifyToken', verifyToken, (req, res) => {res.send({message: 'ok'})});

app.post('/login-form', require('./utils/loginUser'), (req, res) => {});

app.post('/register-form', require('./utils/createUser'), (req, res) => {});

app.get('/verifyEmail', require('./utils/verifyEmail'), (req, res) => {});

app.post('/updateUser', verifyToken, upload.array('photos'), require('./utils/updateUser'), (req, res) => {});

app.get('/:username', verifyToken, require('./utils/getUser'), (req, res) => {});

app.post('/forgotPassword', require('./utils/forgotPassword'), (req, res) => {});

app.post('/resetPassword', require('./utils/resetPassword'), (req, res) => {});

app.post('/reSendEmail', require('./utils/reSendEmail'), (req, res) => {});

app.use(express.static('../frontend/dist'));


//start server
server.listen(8080, () => {
	  console.log('Server is running on port 8080');
});
