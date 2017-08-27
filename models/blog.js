const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: String,
  body: String,
  date: { type: Date, default: Date.now}
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
