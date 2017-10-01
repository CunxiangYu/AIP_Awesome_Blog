const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

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

// Handlebars helper functions
const {
  stripTags
} = require('./helpers/hbs');

// Handlebars Middleware
app.engine('handlebars', exphbs({
  helpers: {
    stripTags: stripTags
  },
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');



// Body parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Index Route (Welcome page)
app.get('/', (req, res) => {
  res.render('index');
});

// Blogs Index page
app.get('/blogs', (req, res) => {
  Blog.find({})
    .sort({date: 'desc'})
    .then(blogs => {
      res.render('blogs/index', {
        blogs: blogs
      });
    });
});

// Add Blog Route
app.get('/blogs/add', (req, res) => {
  res.render('blogs/add');
});

// Post Blog Route
app.post('/blogs', (req, res) => {
  // Server side validation
  let errors = [];

  if (!req.body.title) {
    errors.push({text: 'Title cannot be empty'});
  }
  if (!req.body.content) {
    errors.push({text: 'Content cannot be empty'})
  }

  // If there is at least one error
  // Then re-render the add blog route with error message
  if (errors.length > 0) {
    res.render('blogs/add', {
      errors: errors,
      title: req.body.title,
      content: req.body.content
    });
  } else {
    const newBlog = {
      title: req.body.title,
      content: req.body.content
    };
    new Blog(newBlog)
      .save()
      .then(blog => {
        res.redirect('/blogs')
      });
  }
});
























// Set port for production and development
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
