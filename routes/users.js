const express = require('express');
const mongoose = require('mongoose');
const generator = require('generate-password');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const emailSetting = require('../config/email');
const router = express.Router();

// Import Blog Model
require('../models/User');
const User = mongoose.model('users');

// Create sendGrid email trasport
const options = {
  auth: {
    api_user: emailSetting.user,
    api_key: emailSetting.key
  }
};

const client = nodemailer.createTransport(sgTransport(options));

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
      });
  }
});

// Password Reset Form Route
router.get('/reset', (req, res) => {
  res.render('users/reset');
});

// Process Password Reset Request Route
router.post('/reset', (req, res) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        req.flash('error_msg', 'No email found, please try again.');
        res.redirect('/users/reset');
      } else {
        // Generate a new random password
        const newPassword = generator.generate({
            length: 10,
            numbers: true
        });

        // Hash the new password and save it into db
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user.save()
              .then(user => {
                req.flash('success_msg', 'Your new password has been sent to your email!');
                res.redirect('/users/login');
              })
              .catch(err => {
                console.log(err);
                return;
              });
          });
        });

        // Send email using sendGrid's service
        const email = {
          from: 'Awesome Blog Support, support@awesome-blog.com',
          to: user.email,
          subject: 'Your password has been reset!',
          text: `Your password has been reset to ${newPassword}`,
          html: `<p>Congratulations! Your password has been
                   successfully reset to:</p>
                 <p>            <strong>${newPassword}</strong></p>
                 <p>You can now <a href="https://fathomless-retreat-52004.herokuapp.com/users/login" target="_blank">Login</a> with your new password!</p>`
        };

        client.sendMail(email, function(err, info){
          if (err ){
            console.log(error);
          }
        });
      }
    });
});

// Logout Route
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are now logged out.');
  res.redirect('/users/login');
});




module.exports = router;
