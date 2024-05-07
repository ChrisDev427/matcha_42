const bcrypt = require('bcrypt');
const User = require('../models/User');
const saltRounds = 10;
const bdd = require('./connectBdd');

function createUser(req){
    let user;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
    })
    .then(() => {
        // verify uniques
        userExist = bdd.find({$or: [{username: user.username}, {email: user.email}]})
        if (userExist) {
            throw new Error('User already exists');
        }
        // send mail verification
        // user.verified = true;
        user.save()
        res.status(201).json({
            message: 'User created successfully!'
        });
    })
    .catch((error) => {
        res.status(400).json({
            error: error
        });
    });
}

module.exports = createUser;