import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Post from './components/post/post'
import CreatePost from './components/createPost/createPost';

import './App.css';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        '/posts'
      );
      setPosts(result.data);
    };

    fetchData();
  }, []);

  const findPost = (id) => {
    const found = posts.findIndex((post) => post._id === id);
    return found;
  };

  const addPost =  (newPost) => {
    if(!newPost.errors){
      setPosts([...posts, newPost])
    }else {
      console.log('smth went wrong')
    } 
  }

  const updatePost = (post) => {
    const updatedPost = findPost(post._id);
    const updatedPosts = [...posts]
    updatedPosts.splice(updatedPost, 1, post);
    setPosts(updatedPosts);
  }

  findPost("5d1c567156f31b333e2376ba");

  return (
    <div className="App">
      <CreatePost addPost={addPost} />
      {posts.map(post => <Post key={post._id} postContent={post} updatePost={updatePost}/>)}
    </div>
  );
}

export default App;