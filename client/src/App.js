import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'

import NavBar from './components/NavBar.js'
import Home from './components/Home.js'
import Footer from './components/Footer.js'
import Matches from './components/Matches.js'
import Match from './components/Match.js'
import MatchCard from './components/MatchCard.js'
import Login from './components/auth/Login.js'
import Register from './components/auth/Register.js'
import CommentCard from './components/comments/CommentCard.js'

// get data from our database
// need to link back end and frontend through data

const  App = () => {
  
  
  const [ matches, setMatches ] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/matches')
        setMatches(Object.values({ ...data }))
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])
  
  return (
    <BrowserRouter>
      <NavBar /> 
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/matches">
          <Matches matchesArray={matches} />
        </Route>
        <Route exact path="/matches/MatchCard">
          <MatchCard matchesArray={matches} />
        </Route>
        <Route exact path="/matches/:id">
          <Match matchesArray={matches} />
        </Route>
        <Route exact path="/matches/:id/CommentCard">
          <CommentCard matchesArray={matches} />
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