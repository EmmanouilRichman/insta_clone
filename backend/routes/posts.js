const router = require('express').Router();
let Post = require('../models/posts');




router.route('/').get((req, res) => {
    Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {


        const title = req.body.title;
        const description = req.body.description;
        const img = req.body.img;
        const name = req.body.name

        const newPost = new Post({
            title,
            description,
            img,
            name
        });
        newPost.save()
            .then(() => res.json('Post added'))
            .catch(err => res.status(400).json('Error: ' + err));
    });

router.route('/:id').get((req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
        .then(() => res.json('Post Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            post.title = req.body.title;
            post.description = req.body.description;
            post.img = req.body.img;
            post.save()
                .then(() => res.json('Post Updated'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error ' + err))
});

module.exports = router;