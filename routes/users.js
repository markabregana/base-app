const express = require('express');     // import express
const router = express.Router();        // initialize router

// Register Route
router.post('/register', (req, res, next) => {
    res.send('REGISTER');
});

// Authenticate Route
router.get('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATE');
});

// Profile
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});


// export router variable
module.exports = router;