import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

  //login form, with split option to start/path to registration
  // needs a small form

  return (<>
    <div>Welcome to Login</div>
    <Link to="/register" >Or Register!</Link>
  </>)
}
export default Login