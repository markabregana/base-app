// initialize dependencies
const express = require('express');         // express app
const path = require('path');               // path module
const bodyParser = require('body-parser');  // for getting data from form submit
const cors = require('cors');               // create access to other localhost
const passport = require('passport');       // for web token
const mongoose = require('mongoose');       // for mongodb

// server
const app = express();                      // initialize app
const port = 3000;                          // initialize backend port

const users = require('./routes/users');    // initialize /routes/users folder

// Middleware
app.use(cors());                            // cors middleware
app.use(bodyParser.json());                 // Body Parser Middleware

app.use('/users', users);                   // routes ./routes/users to /users

app.use(express.static(path.join(__dirname, 'public')));    // initialize public folder for angular

// set root page for backend
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// initialize server
app.listen(port, () => {
    console.log("Backend at localhost:"+port);
});