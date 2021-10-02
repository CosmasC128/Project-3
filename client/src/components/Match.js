import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

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
  const rating = match.rating
  const views = match.views
  const comments = match.comments

  //need to update views on visit, then save to database

  //Button functionality
  //set the votes equal to the database vote total
  let votes = match.votes
  //handle the click event and for the fire button
  const [clicked, setClicked] = useState(false)
  function handleClick(e) {
    if (!clicked) {
      setClicked(true)
      // e.preventDefault()
      console.log('You clicked fire 🔥')
      console.log(e)
      //increment votes
      votes++
      //send votes value back into match object in database, and then re-render votes total if not whole page
      console.log('votes--->', votes)
    }  
  }

  return (<>
    <div>Watch your favourite match: {id}</div>
    <iframe width="560" height="315" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    <div>Fire Rating: {rating}</div>
    <div>Views: {views}</div>
    { comments ? comments.map(comment => { 
      return <div key={comment._id}>{comment.text} comment found </div> 
    })
      :
      <div>No comments yet</div> }
    <div className='fireBtn'><button className="btn btn-primary" type="submit" onClick={handleClick}>🔥 Fire 🔥</button></div>
  </>)
}
export default Match
