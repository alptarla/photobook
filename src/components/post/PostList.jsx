import React, { useEffect, useState } from 'react'
import { fetchPosts } from '../../services/api'
import PostItem from './PostItem'
import classes from './PostList.module.css'

function PostList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  const handleToggleBookmark = () => {
    // toggle bookmark
  }

  const handleToggleLike = () => {
    // toggle like
  }

  useEffect(() => {
    setLoading(true)
    fetchPosts()
      .then((res) => setPosts(res))
      .finally(() => setLoading(false))
  }, [])

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
