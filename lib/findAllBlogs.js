// Find all blogs from db and send them back to client
module.exports = (model, res) => {
  model.find((err, blogs) => {
    if (err) return console.error(err);
    let blogData = blogs.map((blog) => {
      return {
        title: blog.title,
        body: blog.body,
        date: blog.date
      };
    });
    res.json(blogData);
  });
};
