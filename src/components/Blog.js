import React, { Component } from 'react';

class Blog extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.blogTitle}</h1>
        <span>{this.props.date}</span>
        <br />
        <p>{this.props.body}</p>
      </div>
    );
  }
}

export default Blog;
