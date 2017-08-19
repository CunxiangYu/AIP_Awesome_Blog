//Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const data = require('./src/data.json');
const fs = require('fs');

//Init app
const app = express();

// Middleware
// body-parser for parsing request body
// Use JSON format to transfer data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Setting up static asset
app.use(express.static(path.join(__dirname, 'build')));

//Initial Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/blogData', (req, res) => {
  res.json(data);
});

app.post('/postBlog', (req, res) => {
  let post = {
    title: req.body.title,
    text: req.body.text
  };
  data.push(post);
  const dataUpdate = JSON.stringify(data);

  fs.writeFile('./src/data.json', dataUpdate, 'utf8', (err) => {
      if(err) {
        return console.error(err);
      }
  });

  res.json(data);
});

//Set port and start server
const port = process.env.PORT || 8002;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
