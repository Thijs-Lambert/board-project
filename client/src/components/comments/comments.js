import React from 'react'
import DisplayComment from '../displayComment/displayComment';
import CreateComment from '../createComment/createComment';

export default function comments(props) {
  const commentList = props.postComments.map((comment) => <DisplayComment content={comment} formatTime={props.formatTime}/>)
  return (
    <div>
      { commentList }
      <CreateComment postId={props.postId} updatePost={props.updatePost} />
    </div>
  )
}
