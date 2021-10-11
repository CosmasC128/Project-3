import React, { useState, useEffect } from 'react'
import { getTokenFromLocalStorage, getUsername, userIsAuthenticated } from '../helpers/auth.js'
import { useParams, useHistory, useLocation } from 'react-router-dom'

import axios from 'axios'
import CommentCard from './CommentCard.js'
import flame from '../images/fire.png'
import snow from '../images/snowflake.png'

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
  const rating = match.rating
  // let usersViewed = 
  // const loggedUser = getUsername()

  // *** VIEWS CODE
  // in this code, add in a caveat that if the currently logged in users is in the array of usersViewed, we don't run get views
  
  const [viewsCount, setViewsCount] = useState()

  const updateViews = async () => {
    if (views > 0) {
      views++
      await axios.put(`/api/matches/${id}`, { views: views })
      const newViews = await axios.get(`/api/matches/${id}`)
      setViewsCount(newViews.data.views)
    } else if ( views === 0) {
      const newViews = await axios.put(`/api/matches/${id}`, { views: 1 })
      setViewsCount(newViews.data.views)
    }
  }

  // const updateViewerHistory = async (usersViewed) => {
  //   console.log(usersViewed, 'if I get here just check my put')
  //   // await axios.put(`/api/matches/${id}`, { usersViewed: usersViewed })
  // }

  // if (!usersViewed.includes(currentUserLoggedIn)){ //FIX THIS CODE IT IS BROKEN RIGHT NOW
  // }
  // wrap this around updateViews so it doesn't run on pageload if the user had already seen the match.
  if (userIsAuthenticated()){
    updateViews()
  }

  // if (loggedUser){
  //   if (!usersViewed.includes(loggedUser)){
  //     updateUsersViewed()
  //     console.log(usersViewed, 'is that updated here')
  //     updateViewerHistory(usersViewed)
  //   }
  // }

  // *** BUTTON CODE
  //need to update VIEWS on VISIT, then save to database
  const [clicked, setClicked] = useState(false)
  const [count, setCount] = useState(0)

  const handleClick = async () => {
    if (!clicked && userIsAuthenticated()) {
      setClicked(true)
      votes++

      // usersVoted.push(currentUserLoggedIn)  Push the user into the user array we have local to match.js
      // await axios.put(`/api/matches/${id}`, { usersVoted: usersVoted }) PUT that array back into the database

      await axios.put(`/api/matches/${id}`, { votes: votes })
      const match = await axios.get(`/api/matches/${id}`)
      setCount(match.data.votes)
    } else if (!clicked && !userIsAuthenticated()){
      console.log('You must log in to vote!')
    } else {
      console.log('You already voted!')
    }
  }

  // *** COMMENT CODE
  const [formData, setFormData] = useState({
    text: '',
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
      setFormData({
        text: '',
        owner: '',
      })
      getMatch()
    } catch (err) {
      console.log(err)  
    }
  }

  const commentsBox = document.getElementById('commentsBox')

  const handleShow = () => {
    if (commentsBox.style.display === 'flex') {
      commentsBox.style.display = 'none'
    } else {
      commentsBox.style.display = 'flex'
    }
  }

  // *** ADMIN VERIFICATION

  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
  }, [location.pathname])
  
  const handleDeleteMatch = async () => {
    try {
      await axios.delete(`/api/matches/${id}`,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        })
      history.push('/matches')
    } catch (error) {
      console.log(error)
    }
  }
  //rememeber to disabled the voting button if they're not logged in, or if they've already voted

  return (<>
    <div id="matchPage">
      <div className="tophalf">
        <img className='sideimage' src={'https://the-page-of-legends.webnode.es/_files/200000278-b85cdb9559/morgana_blademistress2.png'}></img>
        <div id="playerWrapper" className='container d-flex w-50 justify-content-center align-items-center videoBox'>
          <div className='p-3 text-center '>
            { getUsername() === 'admin' ? <button id="deleteMatchBtn" onClick={ handleDeleteMatch }>Delete Match</button> : <></> }
            <div id="matchTitle"className='text-w89hite'>{ title ? title.slice(0, 55) : 'loading...' }</div>
            <iframe id="iframeO" src={url} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <div id="matchData">
              <div id="matchdataLeft">
                <div className='fireBtn'>
                  { rating > 50 ? 
                    <button className='fireBtn' id="fireButton" type="submit" onClick={handleClick}><img src={ flame } className='flaming'/></button>
                    :
                    <button className='fireBtn' id="iceButton" type="submit" onClick={handleClick}><img src={ snow } className='flaming'/></button>
                  }
                </div>
                <div className='pt-2'>{ count ? (views > 0 ? Math.round(count / views * 100) : Math.round(count / 1 * 100) ) :  (views > 0 ? Math.round(match.votes / views * 100) : Math.round(match.votes / 1 * 100) ) }%</div>
              </div>
              <button id="toggleComments" onClick={ handleShow }>Show Comments</button>
              <div id="matchdataRight">
                <svg id="matchEye" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                </svg> { viewsCount ? viewsCount : views }
              </div>
            </div>
          </div>
        </div>
        <img className='sideimage' src={'https://the-page-of-legends.webnode.es/_files/200000273-aff03b1e63/Sin_ttulo-1-3.png'}></img>
      </div>

      <div id="commentWrapper" className='container pt-3 d-flex justify-content-center commentBox'>
        <div id="commentsBox" className='commentsBox'>
          <h4 className='text-center' id="commentsTitle" >~ Comments ~</h4>
          { comments ? comments.map(comment => { 
            return <CommentCard key={comment._id} { ...comment } matchId={ id } getMatch={ getMatch }/>
          })
            :
            <div>No comments yet</div>
          }
          { userIsAuthenticated() ?
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
            :
            <>
              <br/>
              <h6>Log in to comment</h6>
            </>
          }
        </div>
      </div>
    </div>
  </>)
}

export default Match