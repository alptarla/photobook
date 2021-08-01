import { useEffect, useState } from 'react'
import { fetchUserByEmail } from '../services/api'
import { auth } from '../services/firebase'

function useCurrentUser() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  const loadCurrentUser = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (storedUser) setUser(storedUser)

    auth.onAuthStateChanged(async (user, err) => {
      if (err) {
        setError(err.message)
        localStorage.removeItem('user')

        return
      }

      const userData = await fetchUserByEmail(user.providerData[0].email)
      setUser(userData)
    })
  }

  useEffect(() => {
    loadCurrentUser()
  }, [])

  return { user, error }
}

export default useCurrentUser
