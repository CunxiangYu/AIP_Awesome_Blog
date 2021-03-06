const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Import User model
const User = mongoose.model('users');

module.exports = function(passport) {
  passport.use(new LocalStrategy({usernameField: 'email'}, (email,
  password, done) => {
    User.findOne({
      email: email
    }).then(user => {
      // If user does not exist
      if (!user) {
        return done(null, false, {message: 'User does not exist.'});
      }

      // Match password if user exist
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Incorrect password.'});
        }
      });
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
