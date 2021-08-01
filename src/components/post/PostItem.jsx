import classNames from 'classnames'
import moment from 'moment'
import React, { useState } from 'react'
import Avatar from '../ui/Avatar'
import classes from './PostItem.module.css'

function PostItem({
  post,
  toggleBookmark,
  toggleLike,
  isLiked = false,
  isBookmarked = false,
}) {
  const [like, setLike] = useState(isLiked)
  const [bookmark, setBookmark] = useState(isBookmarked)

  const handleToggleBookmark = () => {
    setBookmark((prev) => !prev)
    toggleBookmark(!isBookmarked)
  }

  const handleToggleLike = () => {
    setLike((prev) => !prev)
    toggleLike(!isLiked)
  }

  const likeClass = classNames({ fas: like, far: !like }, 'fa-heart')
  const bookmarkClass = classNames(
    { fas: bookmark, far: !bookmark },
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
