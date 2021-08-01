import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, selectPost, toggleLikePost } from '../../store/slices/post'
import { selectUser, toggleBookmarkPost } from '../../store/slices/user'
import PostItem from './PostItem'
import classes from './PostList.module.css'

function PostList() {
  const dispatch = useDispatch()
  const { posts, loading } = useSelector(selectPost)
  const { user } = useSelector(selectUser)

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  const handleToggleBookmark = ({ isBookmarked, postId, email }) => {
    dispatch(toggleBookmarkPost({ isBookmarked, postId, email }))
  }

  const handleToggleLike = ({ isLiked, postId, email }) => {
    dispatch(toggleLikePost({ isLiked, postId, email }))
  }

  if (loading) return <div>...loading</div>

  return (
    <div className={classes.postList}>
      {posts.map((post, index) => (
        <PostItem
          key={index}
          post={post}
          user={user}
          toggleBookmark={handleToggleBookmark}
          toggleLike={handleToggleLike}
        />
      ))}
    </div>
  )
}

export default PostList
