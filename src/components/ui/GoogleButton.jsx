import React from 'react'
import classes from './GoogleButton.module.css'

const GoogleButton = ({ onClick }) => (
  <button className={classes.googleButton} onClick={onClick}>
    <i className='fab fa-google' />
    <span>Sign In with Google</span>
  </button>
)

export default GoogleButton
