import React, { Component } from 'react';
import axios from 'axios';

class createComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const res = await axios.post(`/posts/${this.props.postId}/comments`, {...this.state, post: this.props.postId});
    this.setState({
      text: ' ',
    });
    this.props.updatePost(res.data);
  }

  render() {
    const { text } = this.state;

    return (
      <form className="container" onSubmit={this.handleSubmit}>
      <fieldset>
        <label htmlFor="title">Comment</label>
        <input name="text" onChange={this.handleChange} type="text" className="form-control" id="title" value={text || ''} placeholder="Title" />
      </fieldset>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    );
  }
}

export default createComment;