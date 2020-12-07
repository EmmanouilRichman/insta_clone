require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');


const app = express();
const port = process.env.PORT || 600;

//middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewParser: true, useCreateIndex: true}
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const postRouter = require('./routes/posts');
const chatRouter = require('./routes/chat');

app.use('/posts', postRouter);
app.use('/chat', chatRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

