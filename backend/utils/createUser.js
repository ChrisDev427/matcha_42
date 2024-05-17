const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');
const {sendEmail} = require('./sendEmailVerification');
const twig = require('twig');
const { UUID } = require('mongodb');
const path = require('path');
const connectBdd = require('./connectBdd');

class DuplicationError extends Error {
    constructor(message) {
        super(message);
        this.name = "DuplicationError";
    }
}

async function createUser(req, res) {
    try {
        await connectBdd();
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) {
            throw new DuplicationError('Email already exists');
        }
        const usernameExist = await User.findOne({ username: req.body.userName });
        if (usernameExist) {
            throw new DuplicationError('Username already exists');
        }
        const user = new User({
            username: req.body.userName,
            email: req.body.email,
            password: hash,
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            refreshToken: new UUID().toString(),
        });
        await sendEmail(user.email, user.refreshToken);
        await user.save();
        res.status(201).json({ message: "User created" });
    } catch (error) {
        console.log("Error in createUser", error);
        if (error instanceof DuplicationError)
        {
            res.status(409).json({ message: error.message });
            return;
        }
        else
        {
            res.status(503).json({ message:  error.message });
            await User.deleteOne({ email: req.body.email });
        }
    }
}

module.exports = createUser;