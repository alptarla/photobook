import classNames from 'classnames'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUser, signInWithGoogle, signOut } from '../../store/slices/user'
import Avatar from '../ui/Avatar'
import Container from '../ui/Container'
import GoogleButton from '../ui/GoogleButton'
import UploadButton from '../ui/UploadButton'
import classes from './Header.module.css'

function Header() {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector(selectUser)

  const handleUploadClick = () => {
    // upload a photo
  }

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle())
  }

  const handleSignOut = () => {
    dispatch(signOut())
  }

  const signOutClass = classNames('fas fa-sign-out-alt', classes.signOutButton)

  return (
    <div className={classes.header}>
      <Container>
        <div className={classes.headerContent}>
          <Link to='/'>
            <div className={classes.brand}>
              <Avatar text='Photobook Social' />
              <h4>Photobook Social</h4>
            </div>
          </Link>
          <nav className={classes.nav}>
            <ul>
              <li className={classes.navItem}>
                <Link to='/'>Home</Link>
              </li>
              {isAuthenticated && (
                <li className={classes.navItem}>
                  <Link to='/'>Profile</Link>
                </li>
              )}
              <li className={classes.navItem}>
                <Link to='/'>About</Link>
              </li>
            </ul>
          </nav>
          <div className={classes.action}>
            {isAuthenticated ? (
              <>
                <Link to='/profile/me'>
                  <Avatar src={user.photoURL} text={user.displayName} />
                </Link>
                <UploadButton onClick={handleUploadClick} />
                <i className={signOutClass} onClick={handleSignOut} />
              </>
            ) : (
              <GoogleButton onClick={handleGoogleSignIn} />
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Header
