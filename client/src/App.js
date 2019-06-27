import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CreatePost from './components/createPost';

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
  }, [posts]);

  const handlePostChange =  (newPost) => {
    setPosts([...posts, newPost])
    console.log(posts[0].date)
  }

  const formatTime = (time) => {
    const date = new Date(time);
    return date
  }

  return (
    <div className="App">
      {posts.map(post => <div key={post._id}><header><h1>{post.title}</h1><h6>{formatTime(post.date).toLocaleDateString()}</h6></header><p>{post.description}</p></div>)}
      <CreatePost updatePosts={handlePostChange}/>
    </div>
  );
}

export default App;
