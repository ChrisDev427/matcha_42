var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'photos/tmp' });
const verifyToken = require('../middlewares/jwt');
const getLocationWithIp = require('../middlewares/getLocationWithIp');



router.post('/login', require('../utils/loginUser'), (req, res) => {});

router.post('/submit-form', require('../utils/createUser'), (req, res) => {});

router.post('/forgotPassword', require('../utils/forgotPassword'), (req, res) => {});

router.post('/resetPassword', require('../utils/resetPassword'), (req, res) => {});

router.post('/reSendEmail', require('../utils/reSendEmail'), (req, res) => {});

router.get('/verifyEmail', require('../utils/verifyEmail'), (req, res) => {});

router.post('/updateUser', verifyToken, getLocationWithIp, upload.array('photos'), require('../utils/updateUser'), (req, res) => {});

router.get('/profile/:username', verifyToken, getLocationWithIp, require('../utils/getUser'), (req, res) => {});

router.get('/verifyToken', verifyToken, (req, res) => {
	res.send({ message: "Token is valid" });
});

module.exports = router;
