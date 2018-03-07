//schema for contacts
const mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
 username:{
    type: String,
    unique: true,
    required: true
 }
});

const User = module.exports = mongoose.model('User', UserSchema);
