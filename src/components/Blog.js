import React, { Component } from 'react';

class Blog extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.blogTitle}</h1>
        <p>{this.props.text}</p>
      </div>
    );
  }
}

export default Blog;
