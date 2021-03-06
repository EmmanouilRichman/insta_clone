const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    img: { type: String },
    name: {type: String},
    date: {type: Date, default: Date.now()},
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;