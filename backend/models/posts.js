const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    img: { type: String },
    date: {type: Date, default: Date.now()},
    likeCount: {type: Number, default: 0},
    comments:[{
        message:{type: String}
    }]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;