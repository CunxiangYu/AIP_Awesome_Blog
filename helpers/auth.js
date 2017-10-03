/***
*  Function for ensuring only authorized
*  user can access certain routes
***/

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'You are not authorized, please log in.');
    res.redirect('/users/login');
  }
};
