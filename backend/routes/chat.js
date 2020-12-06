const router = require('express').Router();
const Chat = require('../models/chat');

router.route('/').get((req, res) => {
    Chat.find()
    .then(chats => res.json(chats))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const message = req.body.message;
    const name = req.body.name;
    
    const newChat = new Chat({
        message,
        name
    });

    newChat.save()
    .then(() => res.json('Post added'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;