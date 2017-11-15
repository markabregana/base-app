const express = require('express');         // import express
const router = express.Router();            // initialize router
const passport = require('passport');       // initialize passport
const jwt = require('passport-jwt');        // initialize passport jwt

const User = require('../models/user');     // get User from models/user

// Register Route
router.post('/register', (req, res, next) => {
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

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
    res.send('AUTHENTICATE');
});

// Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});


// export router variable
module.exports = router;