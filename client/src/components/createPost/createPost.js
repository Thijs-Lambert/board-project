import React, { Component } from 'react'
import axios from 'axios';

import './createPost.css'
export default class createPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      title: '',
      description: '',
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
    const post = this.state
    const res = await axios.post('/posts/', { ...post })
    console.log(res)
    this.props.addPost(res.data)
    this.setState({
      email: '',
      title: '',
      description: '',
    })
  }

  render() {
    const { email, title, description } = this.state;
    return (
    <form className="container" onSubmit={this.handleSubmit}>
      <fieldset>
        <label htmlFor="email">Email address</label>
        <input name="email" onChange={this.handleChange} type="email" className="form-control" id="" aria-describedby="emailHelp" value={email || ''} placeholder="Enter email" />
      
        <label htmlFor="title">Title</label>
        <input name="title" onChange={this.handleChange} type="text" className="form-control" id="title" value={title || ''} placeholder="Title" />
      
        <label htmlFor="exampleFormControlTextarea1">Description</label>
        <textarea name="description" onChange={this.handleChange} className="form-control" id="exampleFormControlTextarea1" value={description || ''} rows="3"></textarea>
      </fieldset>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    )
  }
}
