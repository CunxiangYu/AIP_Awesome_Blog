//Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

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

//Set port and start server
const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
