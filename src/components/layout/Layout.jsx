import React from 'react'
import Footer from './Footer'
import Header from './Header'
import classes from './Layout.module.css'

function Layout({ children }) {
  return (
    <div className={classes.layout}>
      <header className={classes.header}>
        <Header />
      </header>
      <main className={classes.main}>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
