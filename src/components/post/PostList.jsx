import classNames from 'classnames'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, selectPost, toggleLikePost } from '../../store/slices/post'
import { selectUser, toggleBookmarkPost } from '../../store/slices/user'
import PostItem from './PostItem'
import classes from './PostList.module.css'

function PostList({ searchTerms, layout, sort }) {
  const dispatch = useDispatch()
  const { posts, loading } = useSelector(selectPost)
  const { user, isAuthenticated } = useSelector(selectUser)

  useEffect(() => {
    dispatch(getPosts({ filters: { searchTerms, sort } }))
  }, [dispatch, searchTerms, sort])

  const handleToggleBookmark = ({ isBookmarked, postId, email }) => {
    dispatch(toggleBookmarkPost({ isBookmarked, postId, email }))
  }

  const handleToggleLike = ({ isLiked, postId, email }) => {
    dispatch(toggleLikePost({ isLiked, postId, email }))
  }

  const postListClass = classNames({
    [classes.horizontalLayout]: layout === 'horizontal',
    [classes.verticalLayout]: layout === 'vertical',
  })

  if (loading) return <div>...loading</div>

  return (
    <div className={postListClass}>
      {posts.map((post, index) => (
        <PostItem
          key={index}
          post={post}
          user={user}
          isAuthenticated={isAuthenticated}
          toggleBookmark={handleToggleBookmark}
          toggleLike={handleToggleLike}
        />
      ))}
    </div>
  )
}

export default PostList
