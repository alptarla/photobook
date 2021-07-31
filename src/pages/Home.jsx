import React from 'react'
import PostList from '../components/post/PostList'
import Container from '../components/ui/Container'

function Home() {
  return (
    <Container>
      {/* search, filter, toggle layout */}
      <PostList />
      {/* pagination */}
    </Container>
  )
}

export default Home
