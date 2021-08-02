import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '../components/ui/Avatar'
import Container from '../components/ui/Container'
import {
  getUserBookmarks,
  getUserPosts,
  selectPost,
} from '../store/slices/post'
import { selectUser } from '../store/slices/user'
import classes from './Profile.module.css'

function Profile() {
  const [tab, setTab] = useState('posts')

  const dispatch = useDispatch()

  const { user } = useSelector(selectUser)
  const { userPosts, bookmarks, loading } = useSelector(selectPost)

  useEffect(() => {
    if (!user) return

    dispatch(getUserPosts({ email: user.email }))
    dispatch(getUserBookmarks({ userId: user.id }))
  }, [tab, user, dispatch])

  const handleTabChange = (tabName) => () => setTab(tabName)

  const tabClass = (tabName) =>
    classNames({ [classes.active]: tab === tabName })

  const mainContent = () => {
    let content = []
    content = tab === 'posts' ? userPosts : bookmarks

    return content.map((post, index) => (
      <img src={post.src} alt={post.description} key={index} />
    ))
  }

  return (
    <Container>
      <div className={classes.profile}>
        <div className={classes.sideMenu}>
          <div className={classes.sideMenuTop}>
            <Avatar text={user.displayName} src={user.photoURL} />
            <h4>{user.displayName}</h4>
          </div>
          <ul className={classes.sideMenuTabs}>
            <li
              className={tabClass('posts')}
              onClick={handleTabChange('posts')}
            >
              Posts
            </li>
            <li
              className={tabClass('bookmarks')}
              onClick={handleTabChange('bookmarks')}
            >
              Bookmarks
            </li>
          </ul>
        </div>
        <div className={classes.main}>{mainContent()}</div>
      </div>
    </Container>
  )
}

export default Profile
