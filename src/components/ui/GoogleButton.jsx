import React from 'react'
import classes from './GoogleButton.module.css'

const GoogleButton = ({ onClick }) => (
  <button className={classes.googleButton} onClick={onClick}>
    <i className='fab fa-google fa-2x' />
    <span>Sign In with Google</span>
  </button>
)

export default GoogleButton
