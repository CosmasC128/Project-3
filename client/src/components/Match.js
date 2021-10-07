import React, { useState, useEffect } from 'react'
import { getTokenFromLocalStorage } from '../helpers/auth.js'
import { useParams } from 'react-router-dom'
// import { userIsAuthenticated } from '../helpers/auth.js'
import axios from 'axios'
import CommentCard from './CommentCard.js'
import flame from '../images/fire.png'

const Match = () => {

  const { id } = useParams()
  const [ match, setMatch ] = useState([])
  
  const getMatch = async () => {
    try {
      const matchGet = await axios.get(`/api/matches/${id}`)
      setMatch(matchGet.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMatch()
  }, [id])

  const title = match.title
  const url = match.url
  let views = match.views
  let votes = match.votes
  const comments = match.comments
  // const usersVoted = match.usersVoted
  // const usersViewed = match.usersViewed

  // *** VIEWS CODE
  // in this code, add in a caveat that if the currently logged in users is in the array of usersViewed, we don't run get views
  const [viewsCount, setViewsCount] = useState()

  const getViews = async () => {
    if (views > 0) {
      views++

      // usersViewed.push(currentUserLoggedIn)  Push the user into the user array we have local to match.js
      // await axios.put(`/api/matches/${id}`, { usersViewed: currentUserLoggedIn }) PUT that array back into the database
      
      await axios.put(`/api/matches/${id}`, { views: views })
      
      const newViews = await axios.get(`/api/matches/${id}`)
      setViewsCount(newViews.data.views)
    }
  }

  // if (!usersViewed.includes(currentUserLoggedIn)){ //FIX THIS CODE IT IS BROKEN RIGHT NOW
  // }
  // wrap this around getViews so it doesn't run on pageload if the user had already seen the match.

  getViews()

  // *** BUTTON CODE
  //need to update VIEWS on VISIT, then save to database
  const [clicked, setClicked] = useState(false)
  const [count, setCount] = useState(0)

  const handleClick = async () => {
    if (!clicked) {
      setClicked(true)
      votes++

      // usersVoted.push(currentUserLoggedIn)  Push the user into the user array we have local to match.js
      // await axios.put(`/api/matches/${id}`, { usersVoted: usersVoted }) PUT that array back into the database

      await axios.put(`/api/matches/${id}`, { votes: votes })
      const match = await axios.get(`/api/matches/${id}`)
      setCount(match.data.votes)
    } else {
      console.log('handle click error')
    }
  }

  // *** COMMENT CODE
  const [formData, setFormData] = useState({
    text: '',
    rating: '',
    owner: '',
  })

  const handleChange = (event) => {
    const newComment = { ...formData, [event.target.name]: event.target.value }
    setFormData(newComment)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await axios.post(
        `/api/matches/${id}/comments`,
        formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
      getMatch()
    } catch (err) {
      console.log(err)  
    }
  }

  //usersVoted.includes(currentUserLoggedIn) swap this with 'true' below in the jsx under fire rating
  return (<>
    <div id="matchPage">
      <div id="playerWrapper" className='container d-flex w-50 justify-content-center align-items-center videoBox'>
        <div className='p-3 text-center '>
          <div id="matchTitle"className='text-white'>{ title }</div>
          <iframe id="iframeO" src={url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <div id="matchData">
            <div id="matchdataLeft">
              <div className='fireBtn'><button className='fireBtn' type="submit" onClick={handleClick}><img src={flame} className='flaming'/></button></div>
              <div className='pt-2'>{ count ? Math.round(count / views * 100) : Math.round(match.votes / views * 100)}%</div>
            </div>
            <div id="matchdataRight">
              <svg id="matchEye" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
              </svg> {viewsCount}
            </div>
          </div>
        </div>
      </div>

      <div id="commentWrapper" className='container pt-3 d-flex justify-content-center commentBox'>
        <div className='commentsBox'>
          <h4 className='text-center' id="commentsTitle" >~ Comments ~</h4>
          { comments ? comments.map(comment => { 
            return <CommentCard key={comment._id} { ...comment } matchId={ id } getMatch={ getMatch }/>
          })
            :
            <div>No comments yet</div>
          }
          <form className=' m-3 d-flex justify-content-center align-items-center' onSubmit={handleSubmit}>
            
            <textarea
              type="text" 
              placeholder="Write a comment" 
              name="text" 
              onChange={handleChange}
              value={formData.text}
            >
            </textarea>
            <button id="commentSubmit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </>)
}

export default Match







// return (<>
//   <div className="playerWrapper">
//     <div>{ title }</div>
//     <iframe width="560" height="315" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
//     <div className="fireWrap">
//       <div>Fire Rating: { count ? count / views * 100 : match.votes / views * 100} %</div>
//       <div className='fireBtn'><button className="btn btn-primary" type="submit" onClick={handleClick}>🔥 Fire 🔥</button></div>
//     </div>
//     <div>Views: {viewsCount}</div>
//   </div>
//   { comments ? comments.map(comment => { 
//     return <CommentCard key={comment._id} { ...comment } matchId={ id } getMatch={ getMatch }/>
//   })
//     :
//     <div>No comments yet</div>
//   }
//   <form onSubmit={handleSubmit}>
//     <textarea
//       type="text" 
//       placeholder="Write a comment... " 
//       name="text" 
//       onChange={handleChange}
//       value={formData.text}
//     >
//     </textarea>
//     <button>Submit</button>
//   </form>
// </>)