import React, { Component } from 'react';
import BlogList from './BlogList';
import BlogForm from './BlogForm';
import axios from 'axios';

// Container of blog body and set up initial blog data and component states
class BlogBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.handleBlogSubmit = this.handleBlogSubmit.bind(this);
  }

  handleBlogSubmit(blog) {
    //Submit new blog data to server
    axios.post('/postBlog', blog)
      .then(res => {
        this.setState({data: res.data});
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    //Fetching data from server
    axios.get('/blogData')
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
