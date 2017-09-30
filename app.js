const express = require('express');
const mongoose = require('mongoose');

const app = express();


app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 8000;
const host = process.env.IP || '0.0.0.0';
app.listen(port, host, () => {
    console.log(`Server started on port ${port}`);
});
