import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PostModal from '../components/post/PostModal'
import Avatar from '../components/ui/Avatar'
import Container from '../components/ui/Container'
import ProfileSkeleton from '../components/ui/ProfileSkeleton'
import {
  getUserBookmarks,
  getUserPosts,
  selectPost,
} from '../store/slices/post'
import { selectUser } from '../store/slices/user'
import classes from './Profile.module.css'

function Profile() {
  const [tab, setTab] = useState('posts')
  const [selectedPost, setSelectedPost] = useState(null)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const dispatch = useDispatch()

  const { user, isAuthenticated } = useSelector(selectUser)
  const { userPosts, bookmarks, loading } = useSelector(selectPost)

  useEffect(() => {
    if (!user) return

    dispatch(getUserPosts({ email: user.email }))
    dispatch(getUserBookmarks({ userId: user.id }))
  }, [tab, user, dispatch])

  const handleOpenModal = (post) => () => {
    setSelectedPost(post)
    setIsOpenModal(true)
  }

  const handleCloseModal = () => {
    setSelectedPost(null)
    setIsOpenModal(false)
  }

  const handleTabChange = (tabName) => () => setTab(tabName)

  const tabClass = (tabName) =>
    classNames({ [classes.active]: tab === tabName })

  const mainContent = () => {
    if (loading)
      return (
        <>
          <ProfileSkeleton />
          <ProfileSkeleton />
          <ProfileSkeleton />
        </>
      )

    let content = []
    content = tab === 'posts' ? userPosts : bookmarks

    return content.map((post, index) => (
      <img
        src={post.src}
        alt={post.description}
        key={index}
        onClick={handleOpenModal(post)}
      />
    ))
  }

  if (!isAuthenticated) return <Redirect to='/' />

  return (
    <Container>
      <PostModal
        isOpen={isOpenModal}
        onRequestClose={handleCloseModal}
        post={selectedPost}
      />
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
