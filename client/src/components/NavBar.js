import React, { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { getPayload } from '../helpers/auth'

const NavBar = () => {

  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
  }, [location.pathname])

  const userIsAuthenticated = () => {
    const payload = getPayload()
    if (!payload) return
    const currentTime = Math.round(Date.now() / 1000)
    return currentTime < payload.exp
  }
  // console.log('User is authenticated ->', userIsAuthenticated())

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  // if user is logged in, should display logout button/code instead of login/register
  // background image and styling

  return (
    <div className='navbar'>
      <div><Link to="/" >Home</Link></div>
      <div><Link to="/matches" >Matches</Link></div>
      <div><Link to="/matches/MatchCard" >MatchCard</Link></div>
      <div>
        {
          userIsAuthenticated() ? 
            <div className="nav-item">
              <span onClick={handleLogout}>Logout</span>
            </div>
            :
            <>
              <div className="nav-item">
                <Link to="/register">Register</Link>
              </div>
              <div className="nav-item">
                <Link to="/login">Login</Link>
              </div>
            </>
        }
      </div>
    </div>
  )
}
export default NavBar


// roll back code for Navbar
// import React from 'react'
// import { Link } from 'react-router-dom'

// const NavBar = () => {


//   // if user is logged in, should display logout button/code instead of login/register
//   // background image and styling

//   return (<>
//     <Link to="/" >Home</Link>
//     <Link to="/matches" >Matches</Link>
//     <Link to="/matches/MatchCard" >MatchCard</Link>
//     <Link to="/login" >Login/Register</Link>
//     <div>Hello World!</div>
//   </>)
// }
// export default NavBar