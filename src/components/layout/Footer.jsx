import React from 'react'
import Avatar from '../ui/Avatar'
import Container from '../ui/Container'
import classes from './Footer.module.css'

function Footer() {
  return (
    <div className={classes.footer}>
      <Container>
        <div className={classes.footerContent}>
          <Avatar text='Photobook Social' />
          <p>Photobook Social App &copy; copyright 2021</p>
        </div>
      </Container>
    </div>
  )
}

export default Footer
