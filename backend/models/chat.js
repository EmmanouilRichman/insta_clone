const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
   messages:{
       message: {type: String},
       name: {type: String},
       date: {date: {type: Date, default: Date.now()},}
   }
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;