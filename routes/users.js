const express = require('express');         // import express
const router = express.Router();            // initialize router
const passport = require('passport');       // initialize passport
const jwt = require('jsonwebtoken');        // initialize jsonwebtoken
const config = require('../config/database');   // initialize database config

const User = require('../models/user');     // get User from models/user

// Register Route
router.post('/register', (req, res, next) => {
    // get post from http request
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    // add user to db
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg:'Failed to register user'});
        } else {
            res.json({success: true, msg:'Successfully register user'});
        }
    });
});

// Authenticate Route
router.post('/authenticate', (req, res, next) => {
    // get username and password on http request
    const username = req.body.username;
    const password = req.body.password;

    // get user details
    User.getUserByUsername(username, function(err, user){
        if(err) throw err; // error for invalid username

        // if user is found
        if(!user){
            return res.json({success: false, msg: "User not found"});
        }

        // if user's password is correct
        User.comparePassword(password, user.password, function(err, isMatch){
            if(err) throw err;

            // match password
            if(isMatch){
                // sign in user and set token expiration
                const token = jwt.sign({data: user}, config.secret, {
                    expiresIn: 604800 // expires in week
                });

                // pass the user details
                res.json({
                    success: true,
                    token: 'JWT'+token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                })
            } else {
                // if not match
                res.json({success: false, msg: "Wrong Password"});
            }
        });
    });
});

// Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});


// export router variable
module.exports = router;