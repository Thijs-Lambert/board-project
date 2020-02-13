import React from 'react'
import Comments from '../comments/comments';

import './post.css';

const post = props => {

  const formatTime = (time) => {
    const date = new Date(time);
    const displayTime = `${date.getHours()} : ${date.getMinutes()}`
    return displayTime;
  }

  const { _id, title, description, date, comments } = props.postContent;
  
  return (
    <article className="postContainer">
      <header>
        <h1>{title}</h1>
        <p>{formatTime(date)}</p>
      </header>
      <p>{description}</p>
      <Comments 
        postId = {_id} 
        postComments={comments} 
        updatePost={props.updatePost}
        formatTime={formatTime}
      />
    </article>
  )
};

export default post;
