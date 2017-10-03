const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { ensureAuthenticated } =require('../helpers/auth'); // Protect routes

// Import Announcement Model
require('../models/Announcement');
const Announcement = mongoose.model('announcements');

// Process GET latest announcement Route
router.get('/', ensureAuthenticated, (req, res) => {
  Announcement.find({})
    .sort({date: 'desc'})
    .limit(1)
    .then(announcement => {
      res.json({ data: announcement[0].announcement });
    });
});

// Make Announcement Form Route
router.get('/make', ensureAuthenticated, (req, res) => {
  res.render('announcements/make');
});

// Process Make Announcement Form Route
router.post('/', ensureAuthenticated, (req, res) => {
  // Server side validation
  let errors = [];

  if (!req.body.announcement) {
    errors.push({text: 'Announcement cannot be empty.'});
  }

  // If there is at least one error
  // Then re-render the make announcement route with error message
  if (errors.length > 0) {
    res.render('announcements/make', {
      errors: errors,
    });
  } else {
    const newAnnouncement = {
      announcement: req.body.announcement,
      admin: req.user.id
    };
    new Announcement(newAnnouncement)
      .save()
      .then(announcement => {
        req.flash('success_msg', 'Your announcement has been successfully made.');
        res.redirect('/blogs')
      });
  }
});

module.exports = router;
