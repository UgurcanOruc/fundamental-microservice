const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
    if (type === 'PostCreated') {
        const { id, title } = data;     
        posts[id] = { id, title };
    }
    console.log('Received Event:', type);
    res.send({});
}
);

app.listen(4002, () => {
  console.log('Query service is running on port 4002');
});