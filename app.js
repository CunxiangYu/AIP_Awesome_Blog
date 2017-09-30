const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();

// Use Handlebars Middleware and setup view engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Index Route
app.get('/', (req, res) => {

});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
