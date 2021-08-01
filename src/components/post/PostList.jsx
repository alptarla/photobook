import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, selectPost } from '../../store/slices/post'
import PostItem from './PostItem'
import classes from './PostList.module.css'

function PostList() {
  const dispatch = useDispatch()
  const { posts, loading } = useSelector(selectPost)

  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  const handleToggleBookmark = () => {
    // toggle bookmark
  }

  const handleToggleLike = () => {
    // toggle like
  }

  if (loading) return <div>...loading</div>

  return (
    <div className={classes.postList}>
      {posts.map((post, index) => (
        <PostItem
          key={index}
          post={post}
          toggleBookmark={handleToggleBookmark}
          toggleLike={handleToggleLike}
          isBookmarked={false}
          isLiked={false}
        />
      ))}
    </div>
  )
}

export default PostList
