import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import NavBar from './components/NavBar.js'
import Home from './components/Home.js'
import Footer from './components/Footer.js'
import Matches from './components/Matches.js'
import Match from './components/Match.js'
import MatchCard from './components/MatchCard.js'
import CommentCard from './components/CommentCard.js'

import AdminUpload from './components/AdminUpload.js'
import Login from './components/auth/Login.js'
import Register from './components/auth/Register.js'

// get data from our database
// need to link back end and frontend through data

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
        <Route exact path="/matches/MatchCard">
          <MatchCard />
        </Route>
        <Route exact path="/matches/:id">
          <Match />
        </Route>
        <Route exact path="/matches/:id/comments">
          <CommentCard />
        </Route>
        <Route exact path="/adminUpload">
          <AdminUpload />
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