//Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const db = require('./dbCredentials');
const findAllBlogs = require('./lib/findAllBlogs');

//Initialize app
const app = express();

// Connect to mLab database
mongoose.connect(`mongodb://${db.user}:${db.password}@ds151973.mlab.com:51973/aip_blog`);

// Blog Collection
const Blog = require('./models/blog');

// Middleware
// body-parser for parsing request body
// Use JSON format to transfer data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Setting up static asset
app.use(express.static(path.join(__dirname, 'build')));

//Index Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/blog', (req, res) => {
  findAllBlogs(Blog, res);
});

app.post('/api/blog', (req, res) => {
  let title = req.body.title;
  let body = req.body.text;
  new Blog({
    title: title,
    body: body,
    date: new Date()
  }).save();

  findAllBlogs(Blog, res);
});

//Set port and start server
const port = process.env.PORT || 8002;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
