import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, selectPost, toggleLikePost } from '../../store/slices/post'
import { selectUser, toggleBookmarkPost } from '../../store/slices/user'
import PostItem from './PostItem'
import classes from './PostList.module.css'

function PostList({ searchTerms, layout, sort }) {
  const dispatch = useDispatch()
  const { posts, loading } = useSelector(selectPost)
  const { user, isAuthenticated } = useSelector(selectUser)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(() => {
    dispatch(getPosts({ filters: { searchTerms, sort } }))
  }, [dispatch, searchTerms, sort, isAuthenticated])

  const handleToggleBookmark = ({ isBookmarked, postId, email }) => {
    dispatch(toggleBookmarkPost({ isBookmarked, postId, email }))
  }

  const handleToggleLike = ({ isLiked, postId, email }) => {
    dispatch(toggleLikePost({ isLiked, postId, email }))
  }

  const openModal = (post) => {
    setSelectedPost(post)
    setIsOpenModal(true)
  }

  const closeModal = () => {
    setSelectedPost(null)
    setIsOpenModal(false)
  }

  const postListClass = classNames({
    [classes.horizontalLayout]: layout === 'horizontal',
    [classes.verticalLayout]: layout === 'vertical',
  })

  if (loading) return <div>...loading</div>

  return (
    <div>
      <Modal
        className={classes.modal}
        isOpen={isOpenModal}
        onRequestClose={closeModal}
      >
        <div className={classes.modalContent}>
          <img
            className={classes.modalImage}
            src={selectedPost?.src}
            alt={selectedPost?.description}
          />
          <i className='fas fa-times' onClick={closeModal} />
        </div>
      </Modal>
      <div className={postListClass}>
        {posts.map((post, index) => (
          <PostItem
            key={index}
            post={post}
            user={user}
            isAuthenticated={isAuthenticated}
            toggleBookmark={handleToggleBookmark}
            toggleLike={handleToggleLike}
            openModal={openModal}
          />
        ))}
      </div>
    </div>
  )
}

export default PostList
