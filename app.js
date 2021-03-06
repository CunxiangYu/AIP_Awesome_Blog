const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const exphbs = require('express-handlebars');
const passport = require('passport');
const bodyParser = require('body-parser');

// Init app
const app = express();

// Import routes
const blogs = require('./routes/blogs');
const users = require('./routes/users');
const announcements = require('./routes/announcements');

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
mongoose.Promise = global.Promise; // Map global promise
const dbConfig = require('./config/database');

mongoose.connect(dbConfig.setting, {
  useMongoClient: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

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

// Set up static assets
app.use(express.static(path.join(__dirname, 'public')));

// Method Override Middleware
app.use(methodOverride('_method'));

// Express session Middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

// Passport session Middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash messaging Middleware
app.use(flash());

// Global variables Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// Index Route (Welcome page)
app.get('/', (req, res) => {
  if (req.user) {
    res.render('index', {
      isAdmin: req.user.isAdmin
    });
  } else {
    res.render('index');
  }
});

// Use blog, user and announcement routes
app.use('/blogs', blogs);
app.use('/users', users);
app.use('/announcements', announcements);

// Set port for production and development
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
