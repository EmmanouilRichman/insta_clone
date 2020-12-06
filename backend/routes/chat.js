const router = require('express').Router();
const Chat = require('../models/chat');

router.route('/').get((req, res) => {
    Chat.find()
    .then(chats => res.json(chats))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;