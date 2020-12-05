const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    user: {type: String},
    message: {type: String},
    date: {type: Date, default: Date.now()},
});