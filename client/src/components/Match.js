import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTokenFromLocalStorage } from '../helpers/auth.js'
import { getCommentOwner } from '../../../controllers/auth.js'
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
  
  const url = match.url
  const avgRating = match.avgRating
  const views = match.views
  const comments = match.comments
  

  //need to update views on visit, then save to database



  const [formData, setFormData] = useState({
    text: '',
    rating: '',
    owner: '',

  })

  const handleChange = (event) => {
    const newComment = { ...formData, [event.target.name]: event.target.value }
    setFormData(newComment)
  }
  console.log('form daaaa ==>', formData)


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

  console.log('comments ===>', comments)
  
  return (
    
    <>

      <div>Watch your favourite match: {id}</div>
      <iframe width="560" height="315" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <div>Fire Rating: {avgRating}</div>
      <div>Views: {views}</div>
      { comments ? comments.map(comment => { 
        return <div key={comment._id}>{comment.text}</div> 
      })
      
        :
        <div>No comments yet</div> }
    
      {
        <form onSubmit={handleSubmit}>
          <textarea
            type="text" 
            placeholder="Write a comment... " 
            name="text" 
            onChange={handleChange}
            value={formData.text}
            { ...getCommentOwner() }
          >
          </textarea>
          <button>Submit</button>
        </form>}
    </>
  )
}
export default Match
