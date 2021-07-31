import React from 'react'
import classes from './UploadButton.module.css'

const UploadButton = ({ onClick }) => (
  <button className={classes.uploadButton} onClick={onClick}>
    <i className='fas fa-upload fa-2x' />
    <span>Upload</span>
  </button>
)

export default UploadButton
