import React from 'react'
import { Link } from 'react-router-dom'

const MatchCard = ({ id, title, url, avgRating }) => {
  // interact with database for title, url, and fire avgRating, match ID as well

  //provide a link to the individual match
  // link + ID
  // api/matches/id -> links to individual match page

  return (<>
    <div className="cardWrapper">
      <Link to={`/matches/${ id }`}>
        <div>{ title }</div>
        <iframe width="560" height="315" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div>Fire Rating: {avgRating}%</div>
      </Link>  
    </div>
  </>)
}
export default MatchCard