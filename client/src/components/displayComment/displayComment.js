import React from 'react'
import './displayComment.css'

export default function displayComment(props) {
  return (
      <p className="commentText">{props.content.text}
        <span className="timestamp">{props.formatTime(props.content.date)}</span>
      </p>
  )
}
