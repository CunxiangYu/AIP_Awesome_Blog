import React, { Component } from 'react';
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap';

//Form component for posting new blogs to server
class BlogForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: ""
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  handleTextChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault(e);
    let title = this.state.title.trim();
    let text = this.state.text.trim();

    if (!title || !text) {
      return;
    }

    this.props.onBlogSubmit({
      title: title,
      text: text
    });

    this.setState({
      title: "",
      text: ""
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Title</label>
        <br />
        <input
          type="text"
          label="Title"
          placeholder="Enter title here..."
          onChange={this.handleTitleChange}
        />
        <FormGroup controlId="formControlsTextarea">
          <ControlLabel>Blog</ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="Enter blog content here..."
            onChange={this.handleTextChange}
          />
        </FormGroup>
        <Button type="submit">
          Post
        </Button>
      </form>
    );
  }
}

export default BlogForm;
