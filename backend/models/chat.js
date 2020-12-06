const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: {type: String},
    name: {type: String},
    date: {type: Date, default: Date.now()},
})

const chatSchema = new Schema({
   message: [messageSchema]
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;