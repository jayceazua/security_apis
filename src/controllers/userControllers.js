const mongoose require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');


export const register = (req, res) => {
    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.save().then((user) => {
        user.hashPassword = undefined; // do not show the hashPassword
        return res.json(user);
    })
    .catch((err) => {
        return res.status(400).json({message: err.message});
    })
}

export const login = (req, res) => {
    User.findOne({
        email: req.body.email
    }).then((user) => {
        if (!user) {
            res.status(400).json({message: 'Authentication failed. No user found!'});
        } else if (user) {
            if (!user.comparePassword(req.body.passowrd, user.hashPassword)) {
                res.status(400).json({message: 'Authentication failed. Wrong password!'});
            } else {
                return res.json(token: jwt.sign({ email: user.email, username: user.username, _id: user.id}, 'SECRETWORD'));
            }
        }

    })
    .catch((err) => {
        return res.status(400).json({message: err.message})
    })
}

// controller access
export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(400).json({message: 'Unauthorized user!'});
    }
}
