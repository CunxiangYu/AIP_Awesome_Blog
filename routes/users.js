const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

// Import Blog Model
require('../models/User');
const User = mongoose.model('users');

// User Login Route
router.get('/login', (req, res) => {
  res.render('users/login');
});

// User Register Route
router.get('/register', (req, res) => {
  res.render('users/register');
});

// Process Login Form Route
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/blogs',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Process Register Form Route
router.post('/register', (req, res) => {
  let errors = [];

  if (req.body.password !== req.body.password2) {
    errors.push({ text: 'Passwords do not match.' });
  }

  if (req.body.password.length < 4) {
    errors.push({ text: 'Password must be at least 4 characters.' });
  }

  if (errors.length > 0) {
    res.render('users/register', {
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    // Check if email already exist in DB
    User.findOne({email: req.body.email})
      .then(user => {
        if (user) {
          // If exist
          req.flash('error_msg', 'This email has already been registered.');
          res.redirect('/users/register');
        } else {
          // Allow register
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  req.flash('success_msg', 'You are now registered and can log in.');
                  res.redirect('/users/login');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
        }
      })
  }
});

// Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are now logged out.');
  res.redirect('/users/login');
});




module.exports = router;