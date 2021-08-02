import React from 'react'
import { Link } from 'react-router-dom'
import classes from './UploadButton.module.css'

const UploadButton = () => (
  <button className={classes.uploadButton}>
    <Link to='/upload'>
      <i className='fas fa-upload' />
      <span>Upload</span>
    </Link>
  </button>
)

export default UploadButton
