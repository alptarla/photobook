import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from './components/layout/Layout'
import useCurrentUser from './hooks/useCurrentUser'
import Home from './pages/Home'
import { removeUser, setUser } from './store/slices/user'

function App() {
  const { user, error } = useCurrentUser()
  const dispatch = useDispatch()

  useEffect(() => {
    if (error || !user) return dispatch(removeUser())

    dispatch(setUser(user))
  }, [user, error])

  return (
    <Layout>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={true}
      />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
