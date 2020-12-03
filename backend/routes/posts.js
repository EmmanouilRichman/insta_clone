const router = require('express').Router();
const fs = require('fs');
let Post = require('../models/posts');
const multer  = require('multer');
const uuid = require('uuid');

const DIR = 'pics/';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})


router.route('/').get((req, res) => {
    Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(upload.single('img'), (req, res, next) => {

        const url = req.protocol + '://' + req.get('host');

        const title = req.body.title;
        const description = req.body.description;
        const img = url + '/pics/' + req.body.img;
        console.log(img);

        const newPost = new Post({
            title,
            description,
            img,
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
            post.date = req.body.date;
            post.likeCount = req.body.likeCount;
            post.likes = req.body.likes;

            post.save()
                .then(() => res.json('Post Updated'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error ' + err))
});

module.exports = router;