const mongoose = require('mongoose');               // intialize mongoose
const bcrypt = require('bcryptjs');                 // intialize bcryptjs
const config = require('../config/database');       // initalize config file

// user schema and settings
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// export User variable contains User Model
const User = module.exports = mongoose.model('User', UserSchema);

// function for get user by id
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

// function for get user by username
module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
}

// function for add user
module.exports.addUser = function(newUser, callback){
    // bcrypt the password
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            //if(err) throw err;
            newUser.password = hash;    // replace password with encrypted password
            newUser.save(callback);
        });
    });
}