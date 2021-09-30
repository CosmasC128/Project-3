import React from 'react'
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
  const avgRating = match.avgRating
  const views = match.views
  const comments = match.comments

  return (<>
    <div>Watch your favourite match: {id}</div>
    <iframe width="560" height="315" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    <div>Fire Rating: {avgRating}</div>
    <div>Views: {views}</div>
    { comments ? comments.map(comment => { 
      return <div key={comment._id}>{comment.text} comment found</div> 
    })
      :
      <div>No comments yet</div> }
  </>)
}
export default Match
