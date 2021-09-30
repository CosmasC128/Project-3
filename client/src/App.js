import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NavBar from './components/NavBar.js'
import Home from './components/Home.js'
import Footer from './components/Footer.js'
import Matches from './components/Matches.js'
import Match from './components/Match.js'

import Login from './components/auth/Login.js'
import Register from './components/auth/Register.js'

// get data from our database
// need to link back end and frontend through data

// const { createProxyMiddleware } = require('http-proxy-middleware')

// module.exports = function (app){
//   app.use(createProxyMiddleware('/api', { target: 'http://localhost:4000' }))
// }

const  App = () => {
  return (
    <BrowserRouter>
      <NavBar /> 
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/matches">
          <Matches />
        </Route>
        <Route exact path="/matches/:id">
          <Match />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App