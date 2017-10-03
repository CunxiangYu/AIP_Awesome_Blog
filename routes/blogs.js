const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } =require('../helpers/auth'); // Protect routes

// Import Blog Model
require('../models/Blog');
const Blog = mongoose.model('blogs');

// Blogs Index page
router.get('/', ensureAuthenticated, (req, res) => {
  Blog.find({})
    .sort({date: 'desc'})
    .then(blogs => {
      res.render('blogs/index', {
        blogs: blogs,
        isAdmin: req.user.isAdmin
      });
    });
});

// Add Blog Form Route
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('blogs/add', {
    isAdmin: req.user.isAdmin
  });
});

// Show individual Blog Route
router.get('/show/:id', ensureAuthenticated, (req, res) => {
  Blog.findOne({
    _id: req.params.id
  })
  .then(blog => {
    let isAuthor;
    if (blog.author === req.user.id) {
      isAuthor = true;
    } else {
      isAuthor = false;
    }
    res.render('blogs/show', {
      blog: blog,
      isAuthor: isAuthor,
      isAdmin: req.user.isAdmin
    });
  });
});

// Edit Blog Form Route
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Blog.findOne({
    _id: req.params.id
  })
  .then(blog => {
    if (blog.author !== req.user.id) {
      req.flash('error_msg', 'You are not authorized.');
      res.redirect('/blogs');
    } else {
      res.render('blogs/edit', {
        blog: blog,
        isAdmin: req.user.isAdmin
      });
    }
  });
});

// Process Add Blog Form Route
router.post('/', ensureAuthenticated, (req, res) => {
  // Server side validation
  let errors = [];

  if (!req.body.title) {
    errors.push({text: 'Title cannot be empty.'});
  }
  if (!req.body.content) {
    errors.push({text: 'Content cannot be empty.'})
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
      content: req.body.content,
      author: req.user.id
    };
    new Blog(newBlog)
      .save()
      .then(blog => {
        req.flash('success_msg', 'Your blog has been successfully added.');
        res.redirect('/blogs')
      });
  }
});

// Process Edit Blog Form Route
router.put('/:id', ensureAuthenticated, (req, res) => {
  Blog.findOne({
    _id: req.params.id
  })
  .then(blog => {
    // Assign new values
    blog.title = req.body.title;
    blog.content = req.body.content;

    blog.save()
      .then(blog => {
        req.flash('success_msg', 'Your blog has been successfully updated.');
        res.redirect('/blogs');
      });
  });
});

// Delete Blog Route
router.delete('/:id', ensureAuthenticated, (req, res) => {
  Blog.remove({
    _id: req.params.id
  })
  .then(() => {
    req.flash('success_msg', 'Your blog has been successfully deleted.');
    res.redirect('/blogs');
  });
});

module.exports = router;
