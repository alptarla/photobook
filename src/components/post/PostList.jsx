import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, selectPost, toggleLikePost } from '../../store/slices/post'
import { selectUser, toggleBookmarkPost } from '../../store/slices/user'
import PostItem from './PostItem'
import classes from './PostList.module.css'
import PostModal from './PostModal'

function PostList({ searchTerms, layout, sort }) {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  const dispatch = useDispatch()

  const { posts, loading } = useSelector(selectPost)
  const { user, isAuthenticated } = useSelector(selectUser)

  useEffect(() => {
    dispatch(getPosts({ filters: { searchTerms, sort } }))
  }, [dispatch, searchTerms, sort, isAuthenticated])

  const handleToggleBookmark = ({ isBookmarked, postId, email }) => {
    dispatch(toggleBookmarkPost({ isBookmarked, postId, email }))
  }

  const handleToggleLike = ({ isLiked, postId, email }) => {
    dispatch(toggleLikePost({ isLiked, postId, email }))
  }

  const handleOpenModal = (post) => {
    setSelectedPost(post)
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
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
      <PostModal
        isOpen={isOpenModal}
        onRequestClose={handleCloseModal}
        post={selectedPost}
      />
      <div className={postListClass}>
        {posts.map((post, index) => (
          <PostItem
            key={index}
            post={post}
            user={user}
            isAuthenticated={isAuthenticated}
            toggleBookmark={handleToggleBookmark}
            toggleLike={handleToggleLike}
            openModal={handleOpenModal}
          />
        ))}
      </div>
    </div>
  )
}

export default PostList
