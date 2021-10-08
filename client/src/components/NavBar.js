import React, { useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { getUsername, userIsAuthenticated } from '../helpers/auth.js'
// import axios from 'axios'

const NavBar = () => {

  //I want to rerender the navBar on login and logout

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







// import React, { useEffect } from 'react'
// import { Link, useHistory, useLocation } from 'react-router-dom'
// import { userIsAuthenticated } from '../helpers/auth'

// const NavBar = () => {

//   const history = useHistory()
//   const location = useLocation()

//   useEffect(() => {
//   }, [location.pathname])

//   const handleLogout = () => {
//     window.localStorage.removeItem('token')
//     history.push('/')
//   }

//   // if user is logged in, should display logout button/code instead of login/register
//   // background image and styling

//   return (
//     <div className='navbar'>
//       <div><Link to="/" >Home</Link></div>
//       <div><Link to="/matches" >Matches</Link></div>
//       <div>
//         { userIsAuthenticated() ? 
//           <>
//             <div className="nav-item">
//               <Link to="/adminUpload">Admin Upload</Link>
//             </div>
//           </>
//           :
//           <>
//           </>
//         }
//       </div>
//       <div>
//         {
//           userIsAuthenticated() ? 
//             <div className="nav-item">
//               <span onClick={handleLogout}>Logout</span>
//             </div>
//             :
//             <>
//               <div className="nav-item">
//                 <Link to="/register">Register</Link>
//               </div>
//               <div className="nav-item">
//                 <Link to="/login">Login</Link>
//               </div>
//             </>
//         }
//       </div>
//     </div>
//   )
// }
// export default NavBar


// // roll back code for Navbar
// // import React from 'react'
// // import { Link } from 'react-router-dom'

// // const NavBar = () => {


// //   // if user is logged in, should display logout button/code instead of login/register
// //   // background image and styling

// //   return (<>
// //     <Link to="/" >Home</Link>
// //     <Link to="/matches" >Matches</Link>
// //     <Link to="/matches/MatchCard" >MatchCard</Link>
// //     <Link to="/login" >Login/Register</Link>
// //     <div>Hello World!</div>
// //   </>)
// // }
// // export default NavBar