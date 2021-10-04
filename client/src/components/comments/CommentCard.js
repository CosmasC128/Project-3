import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from '../../helpers/auth.js'

const CommentCard = ({ comments }) => {
  const { id } = useParams()
  const [formData, setFormData] = useState({
    text: '',
    rating: '',
    owner: '',

  })

  const handleChange = (event) => {
    const newComment = { ...formData, [event.target.name]: event.target.value }
    setFormData(newComment)
  }
  // console.log('form daaaa ==>', formData)

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
  return (
    <>
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
    </>
  )
}
export default CommentCard