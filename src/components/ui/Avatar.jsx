import React from 'react'
import classes from './Avatar.module.css'

function Avatar({ text }) {
  const content = text
    .toUpperCase()
    .split(' ')
    .map((t) => t[0])
    .join('')

  return <div className={classes.avatar}>{content}</div>
}

export default Avatar
