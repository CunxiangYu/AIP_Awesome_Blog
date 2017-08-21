import React, { Component } from 'react';
import Blog from './/Blog';

function BlogList(props) {
  let blogs = props.data.map(blog => {
    return (
      <Blog key={blog.title} text={blog.text} blogTitle={blog.title} />
    );
  });

  return (
    <div>
      {blogs}
    </div>
  );
}

export default BlogList;
