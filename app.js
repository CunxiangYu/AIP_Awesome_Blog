const express = require('express');
const mongoose = require('mongoose');

const app = express();


app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

const port = process.env.PORT || 3000;
const ip = process.env.IP || '0.0.0.0';

app.listen(port, ip);
