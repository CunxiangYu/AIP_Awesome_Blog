import React, { Component } from 'react';
import BlogList from './BlogList';
import BlogForm from './BlogForm';
import axios from 'axios';

class BlogBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.handleBlogSubmit = this.handleBlogSubmit.bind(this);
  }

  handleBlogSubmit(blog) {
    axios.post('/api/blog', blog)
      .then(res => {
        this.setState({data: res.data});
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    axios.get('/api/blog')
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <BlogList data={this.state.data} />
        <br />
        <BlogForm onBlogSubmit={ this.handleBlogSubmit }/>
      </div>
    );
  }
}

export default BlogBox;
