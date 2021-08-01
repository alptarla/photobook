import React from 'react'
import classes from './Avatar.module.css'

function Avatar({ text, src }) {
  let content
  let isImage

  if (text && !src) {
    content = text
      .toUpperCase()
      .split(' ')
      .map((t) => t[0])
      .join('')

    isImage = false
  } else if (src) {
    content = src
    isImage = true
  }

  return (
    <div className={classes.avatar}>
      {isImage ? <img src={content} alt={content} /> : content}
    </div>
  )
}

export default Avatar
