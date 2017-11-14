// initialize dependencies
const express = require('express');         // express app
const path = require('path');               // path module
const bodyParser = require('body-parser');  // for getting data from form submit
const cors = require('cors');               // create access to other localhost
const passport = require('passport');       // for web token
const mongoose = require('mongoose');       // for mongodb

const app = express();                      // initialize app

const port = 3000;                          // initialize backend port

app.get('/', (req, res) => {                // set root page for backend
    res.send('Invalid Endpoint');
});

app.listen(port, () => {                    // initialize server
    console.log("Backend at localhost:"+port);
});