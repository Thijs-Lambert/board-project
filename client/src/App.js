import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

  return (
    <div className="App">
      {posts.map(post => <div key={post._id}><header><h1>{post.title}</h1></header><p>{post.description}</p></div>)}
    </div>
  );
}

export default App;
