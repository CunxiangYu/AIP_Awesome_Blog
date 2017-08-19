import React, { Component } from 'react';
import Blog from './/Blog';

class BlogList extends Component {
  render() {
    let blogs = this.props.data.map(blog => {
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
}

export default BlogList;
