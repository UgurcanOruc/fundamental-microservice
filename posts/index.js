const express = require('express');
const badyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(badyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = { id, title };

    res.status(201).send(posts[id]);
});

app.listen(4000, () => { 
    console.log('Server is running on port 4000');
});   

// module.exports = app;