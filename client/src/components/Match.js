import React, { useState, useEffect } from 'react'
import { getTokenFromLocalStorage } from '../helpers/auth.js'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Match = () => {

  const { id } = useParams()
  const [ match, setMatch ] = useState([])

  useEffect(() => {
    const getMatch = async () => {
      try {
        const matchGet = await axios.get(`/api/matches/${id}`)
        setMatch(matchGet.data)
      } catch (error) {
        console.log(error)
      }
    }
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

  const handleSubmit = async () => {
    try {
      await axios.post(
        `/api/matches/${id}/comments`,
        formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
        }
      )
    } catch (err) {
      console.log(err)  
    }
  }
  //usersVoted.includes(currentUserLoggedIn) swap this with 'true' below in the jsx under fire rating
  return (<>
    <div className="playerWrapper">
      <div>{ title }</div>
      <iframe width="560" height="315" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <div className="fireWrap">
        <div>Fire Rating: { count ? count / views * 100 : match.votes / views * 100} %</div>
        { true ? <div>You've already voted.</div> : <div className='fireBtn'><button className="btn btn-primary" type="submit" onClick={handleClick}>🔥 Fire 🔥</button></div>}
      </div>
      <div>Views: {viewsCount}</div>
    </div>
    { comments ? comments.map(comment => { 
      return <div key={comment._id}>{comment.text}</div> 
    })
      :
      <div>No comments yet</div> }
    <form onSubmit={handleSubmit}>
      <textarea
        type="text" 
        placeholder="Write a comment... " 
        name="text" 
        onChange={handleChange}
        value={formData.text}
      >
      </textarea>
      <button>Submit</button>
    </form>
  </>)
}

export default Match