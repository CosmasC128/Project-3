import React from 'react'
import { Link } from 'react-router-dom'

const MatchCard = ({ id, title, rating, views, thumbNail }) => {
  // interact with database for title, url, and fire avgRating, match ID as well

  //provide a link to the individual match
  // link + ID
  // api/matches/id -> links to individual match page
  
  return (<>
    <div className="cardWrapper">
      <Link to={`/matches/${ id }`}>
        <div>{ title }</div>
        <img src={thumbNail} alt="failure to load image"></img>
        <div className="matchCardData" style={{ display: 'flex' }}>
          <div>Rating: {rating}% </div>
          <div>Views: {views}</div>
        </div>  
      </Link>  
    </div>
  </>)
}
export default MatchCard