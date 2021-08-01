import classNames from 'classnames'
import moment from 'moment'
import React, { useState } from 'react'
import Avatar from '../ui/Avatar'
import classes from './PostItem.module.css'

function PostItem({ post, user, toggleBookmark, toggleLike }) {
  const [isLiked, setIsLiked] = useState(
    () => post?.likes?.some((e) => user.email) || false
  )
  const [isBookmarked, setIsBookmarked] = useState(
    () => user?.bookmarks?.some((id) => id === post.id) || false
  )

  const handleToggleBookmark = () => {
    setIsBookmarked((prev) => !prev)
    toggleBookmark(!isBookmarked)
  }

  const handleToggleLike = () => {
    setIsLiked((prev) => !prev)
    toggleLike({ postId: post.id, email: user.email, isLiked: !isLiked })
  }

  const likeClass = classNames({ fas: isLiked, far: !isLiked }, 'fa-heart')
  const bookmarkClass = classNames(
    { fas: isBookmarked, far: !isBookmarked },
    'fa-bookmark'
  )

  const createdAt = moment(post.createdAt?.toDate()).fromNow()

  return (
    <div className={classes.post}>
      <div className={classes.postHeader}>
        <Avatar src={post.user.photoURL} text={post.user.displayName} />
        <h4>{post.user.displayName}</h4>
      </div>
      <div className={classes.postBody}>
        <img
          src={post.src}
          alt={post.description}
          className={classes.postImage}
        />
      </div>
      <div className={classes.postAction}>
        <div>
          <i className={likeClass} onClick={handleToggleLike} />
          <i className={bookmarkClass} onClick={handleToggleBookmark} />
        </div>
        <span className={classes.createdAt}>{createdAt}</span>
      </div>
    </div>
  )
}

export default PostItem
