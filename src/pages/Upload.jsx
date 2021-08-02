import { unwrapResult } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import Container from '../components/ui/Container'
import Spinner from '../components/ui/Spinner'
import { addPost, selectPost } from '../store/slices/post'
import { selectUser } from '../store/slices/user'
import classes from './Upload.module.css'

function Upload() {
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  const history = useHistory()
  const dispatch = useDispatch()

  const { user } = useSelector(selectUser)
  const { loading } = useSelector(selectPost)

  const handleDescriptionChange = (e) => setDescription(e.target.value)

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: (file) => setFile(file[0]),
  })

  const handleAddPost = () => {
    if (!file || description === '') {
      toast.warning('Please fill in the blank!')
      return
    }

    const post = {
      user: user.email,
      description,
      createdAt: new Date(),
      likes: [],
      src: file,
    }

    dispatch(addPost({ post }))
      .then(unwrapResult)
      .then(() => {
        toast.success('Post uploaded!')
        history.push('/')
      })
      .catch((err) => {
        toast.error(err.message || 'Something went wrong :(')
      })
  }

  return (
    <Container>
      <div>
        <input
          type='text'
          name='description'
          placeholder='Enter post description'
          value={description}
          onChange={handleDescriptionChange}
          className={classes.descriptionInput}
        />
        <button
          className={classes.addPostButton}
          onClick={handleAddPost}
          disabled={loading}
        >
          New Post
        </button>
      </div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={classes.uploadLayer}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <p>Drag and drop to upload the photo or</p>
              <button className={classes.browseButton}>Browse Computer</button>
            </>
          )}
        </div>
      </div>
    </Container>
  )
}

export default Upload
