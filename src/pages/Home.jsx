import React, { useEffect, useState } from 'react'
import Container from '../components/ui/Container'
import { fetchPhotos } from '../services/api'

function Home() {
  const [photos, setPhots] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchPhotos()
      .then((res) => setPhots(res))
      .finally(() => setLoading(false))
  }, [])

  console.log('photos :>> ', photos)

  return (
    <Container>
      {loading ? (
        <div>...loading</div>
      ) : (
        photos.map((p) => (
          <img
            src={p.src}
            alt={p.description}
            key={p.id}
            width='200'
            height='200'
          />
        ))
      )}
    </Container>
  )
}

export default Home
