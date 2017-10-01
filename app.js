const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
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

// Method Override Middleware
app.use(methodOverride('_method'));

// Express session Middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// Flash Middleware
app.use(flash());

// Global variables Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

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

// Add Blog Form Route
app.get('/blogs/add', (req, res) => {
  res.render('blogs/add');
});

// Show individual Blog Route
app.get('/blogs/show/:id', (req, res) => {
  Blog.findOne({
    _id: req.params.id
  })
  .then(blog => {
    res.render('blogs/show', {
      blog: blog
    });
  });
});

// Edit Blog Form Route
app.get('/blogs/edit/:id', (req, res) => {
  Blog.findOne({
    _id: req.params.id
  })
  .then(blog => {
    res.render('blogs/edit', {
      blog: blog
    });
  });
});

// Process Add Blog Form Route
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
        req.flash('success_msg', 'Your blog has been successfully added!');
        res.redirect('/blogs')
      });
  }
});

// Process Edit Blog Form Route
app.put('/blogs/:id', (req, res) => {
  Blog.findOne({
    _id: req.params.id
  })
  .then(blog => {
    // Assign new values
    blog.title = req.body.title;
    blog.content = req.body.content;

    blog.save()
      .then(blog => {
        req.flash('success_msg', 'Your blog has been successfully updated!');
        res.redirect('/blogs');
      });
  });
});

// Delete Blog Route
app.delete('/blogs/:id', (req, res) => {
  Blog.remove({
    _id: req.params.id
  })
  .then(() => {
    req.flash('success_msg', 'Your blog has been successfully deleted!');
    res.redirect('/blogs');
  });
});




















// Set port for production and development
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
