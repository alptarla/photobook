import React from 'react'
import Modal from 'react-modal'
import classes from './PostModal.module.css'

function PostModal({ isOpen, onRequestClose, post }) {
  return (
    <Modal
      className={classes.modal}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div className={classes.modalContent}>
        <img
          className={classes.modalImage}
          src={post?.src}
          alt={post?.description}
        />
        <i className='fas fa-times' onClick={onRequestClose} />
      </div>
    </Modal>
  )
}

export default PostModal
