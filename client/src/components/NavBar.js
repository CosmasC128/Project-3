import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {


  // if user is logged in, should display logout button/code instead of login/register
  // background image and styling

  return (<>
    <Link to="/" >Home</Link>
    <Link to="/matches" >Matches</Link>
    <Link to="/login" >Login/Register</Link>
    <div>Hello World!</div>
  </>)
}
export default NavBar