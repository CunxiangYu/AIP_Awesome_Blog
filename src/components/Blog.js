import React from 'react';

function Blog(props) {
  return (
    <div>
      <h1>{props.blogTitle}</h1>
      <p>{props.text}</p>
    </div>
  );
}

export default Blog;
