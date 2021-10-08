import React, { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { getUsername, userIsAuthenticated } from '../helpers/auth.js'

const NavBar = () => {

  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
  }, [location.pathname])

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  return (
    <div id='navbar'>
      <div id="navwrap">
        <Link to="/" id="navLink">Home</Link>
        <Link to="/matches" id="navLink">ProMatches</Link>
        {
          getUsername() && getUsername() === 'admin' ? 
            <Link to="/AdminUpload" id="navLink">Admin Upload</Link>
            :
            <>
            </>
        }
        {
          userIsAuthenticated() ? 
            <span id="navLinkLogout" onClick={handleLogout}>Logout: { getUsername() }</span>
            :
            <>
              <Link to="/login" id="navLink">Login</Link>
              <Link to="/register" id="navLink">Register</Link>
            </>
        }
      </div>
    </div>
  )
}
export default NavBar