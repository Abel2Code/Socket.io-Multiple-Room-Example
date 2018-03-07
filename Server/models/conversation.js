//schema for contacts
const mongoose = require('mongoose');

var ConversationSchema = mongoose.Schema({
 initiator:{
    type: String,
    required: true
 },
 reciever:{
 	type: String,
 	required: true
 },
 messages: []
});

const Conversation = module.exports = mongoose.model('Conversation', ConversationSchema);
