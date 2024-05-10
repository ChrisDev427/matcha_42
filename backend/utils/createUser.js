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

async function createUser(req, res) {
    try {
        require('./connectBdd');
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            throw new DuplicationError('User already exists');
        }
        const user = new User({
            username: req.body.userName,
            email: req.body.email,
            password: hash,
            firstname: req.body.firstName,
            lastname: req.body.lastName,
        });
        await user.save();
        await sendEmail(user.email, 'Verify Your Email', 'Please verify your email by clicking on this link: [link]');
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