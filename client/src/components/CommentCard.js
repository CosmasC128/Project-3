import React from 'react'
import { userIsAuthenticated, getTokenFromLocalStorage } from '../helpers/auth.js'
import axios from 'axios'

const CommentCard = ({ matchId, _id, username, text, createdAt, getMatch }) => {

  // This is to get the specific match
  /// COMMENTS CODE
    
  const handleDelete = async () => {
    try {
      await axios.delete(
        `/api/matches/${matchId}/comments/${_id}`,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
      getMatch()
    } catch (err) {
      console.log(err)  
    }
  }

  return (  
    <div className='text-center'>
      <div>{text} User: {username} / { createdAt.slice(0,10) } { createdAt.slice(11, 16) } </div>
      { userIsAuthenticated() ? <button onClick={handleDelete}>Delete</button> : <div></div> }
    </div>
  )
}
export default CommentCard