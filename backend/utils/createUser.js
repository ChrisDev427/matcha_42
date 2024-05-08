const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');
const sendEmail = require('./sendEmailVerification');

class DuplicationError extends Error {
    constructor(message) {
        super(message);
        this.name = "DuplicationError";
    }
}

async function createUser(req) {
    try {
        const bdd = require('./connectBdd');
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            throw new DuplicationError('User already exists');
        }
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            verified: false
        });
        await user.save();
        await sendEmail(user.email, 'Verify Your Email', 'Please verify your email by clicking on this link: [link]');
    } catch (error) {
        console.log("Error in createUser", error);
        if (error instanceof DuplicationError)
            return;
        else
            await User.deleteOne({ email: req.body.email });
    }
}

module.exports = createUser;