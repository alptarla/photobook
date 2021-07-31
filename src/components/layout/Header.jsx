import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../ui/Avatar'
import Container from '../ui/Container'
import GoogleButton from '../ui/GoogleButton'
import UploadButton from '../ui/UploadButton'
import classes from './Header.module.css'

const isAuthenticated = true

function Header() {
  const handleUploadClick = () => {
    // upload a photo
  }

  const handleGoogleSignIn = () => {
    // sign with google
  }

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
                  <Avatar text='Alp Tarla' />
                </Link>
                <UploadButton onClick={handleUploadClick} />
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
