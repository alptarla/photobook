import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App
