import React, { useState } from 'react'
import { getTokenFromLocalStorage } from '../helpers/auth.js'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Match = ({ matchesArray }) => {
  // display embedded URL link, player, title, views, rating, comments
  // toggle to display comments from hidden/none
  const { id } = useParams()
  let match = {}
  for (let i = 0; i < matchesArray.length;i++){
    if (matchesArray[i].id === id) {
      match = matchesArray[i]
    }
  }

  const title = match.title
  const url = match.url
  const views = match.views
  const comments = match.comments
  let votes = match.votes

  // *** BUTTON CODE
  //need to update VIEWS on VISIT, then save to database
  const [clicked, setClicked] = useState(false)
  const [count, setCount] = useState(0)

  const handleClick = async () => {
    if (!clicked) {
      setClicked(true)
      votes++
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

  return (<>
    <div className="playerWrapper">
      <div>{ title }</div>
      <iframe width="560" height="315" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <div className="fireWrap">
        <div>Fire Rating: { count ? count / views * 100 : match.votes / views * 100} %</div>
        <div className='fireBtn'><button className="btn btn-primary" type="submit" onClick={handleClick}>🔥 Fire 🔥</button></div>
      </div>
      <div>Views: {views}</div>
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
