import React from 'react'
import Footer from './Footer'
import Header from './Header'

function Layout({ children }) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default Layout
