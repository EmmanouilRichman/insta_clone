const router = require('express').Router();
let Post = require('../models/posts');
var fs = require('fs');

router.route('/').get((req, res) => {
    Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const img = {};
    img.data = fs.readFileSync(req.body.img);
    img.contentType = 'image/png';

    const newPost = new Post({
        title,
        description,
        img,
    });

    newPost.save()
        .then(() => res.json('Post added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
