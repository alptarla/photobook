import { useEffect, useState } from 'react'
import { auth } from '../services/firebase'

function useCurrentUser() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const loadCurrentUser = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) setUser(storedUser)

    auth.onAuthStateChanged((user, err) => {
      if (err) {
        setError(err.message)
        localStorage.removeItem('user')

        return
      }

      setUser(user?.providerData[0])
    })
  }

  useEffect(() => {
    loadCurrentUser()
  }, [])

  return { user, error }
}

export default useCurrentUser
