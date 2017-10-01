const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

// Init app
const app = express();

// Connect to database
mongoose.Promise = global.Promise; // Map global promise
const config = require('./config/credentials');

mongoose.connect(config.db, {
  useMongoClient: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Import Blog Model
require('./models/Blog');
const Blog = mongoose.model('blogs');

// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Index Route
app.get('/', (req, res) => {
  res.render('index');
});

// Add Blog Form
app.get('/blogs/add', (req, res) => {
  res.render('blogs/add');
});

// Set port for production and development
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
