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
    <div id="oneCommentRow" className="row">
      <div className="oneCommentBox">
        <div id="writingInBox">
          <div id="commentHeader">
            <div id="poster">{username}</div>
            <div id="timeDiv">{ Number(createdAt.slice(11, 13)) < 9 ? '0' + String(Number(createdAt.slice(11, 13)) + 1) :  Number(createdAt.slice(11, 13)) + 1 }:{ createdAt.slice(14, 16) } { createdAt.slice(8,10) }-{ createdAt.slice(5,7) }-{ createdAt.slice(0,4) } </div>
          </div>
          <div id="commentText">{text}</div>
        </div>
        { userIsAuthenticated() ? <button id="commentDelete" onClick={handleDelete}>DEL</button> : <></> }
      </div>
    </div>
  )
}
export default CommentCard