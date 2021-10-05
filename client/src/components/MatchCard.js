import React from 'react'
import { Link } from 'react-router-dom'

const MatchCard = ({ id, title, rating, views, thumbNail }) => { //pull in usersViewed array through here as well
  // interact with database for title, url, and fire avgRating, match ID as well

  //provide a link to the individual match
  // link + ID
  // api/matches/id -> links to individual match page
  

  // can pull the usersViewed array here, and if the user is in that array, change styling
  // can change the styling to slight grey background color, and add 50% opacity. Then they know they've seen it.

  // should find various icons to display depending on the average rating. 90%+ is best, 70-89% 2nd best, 50-69% 3rd best, then under 50% something snow/cold related
  return (<>
    <div className="cardWrapper">
      <Link to={`/matches/${ id }`}>
        <div>{ title.slice(0, -27) }</div>
        <img className="thumbnail" src={thumbNail} alt="you fucked up"></img>
        <div className="matchCardData" style={{ display: 'flex' }}>
          <div className="rating"> Rating: {rating}% </div>
          <div>Views: {views}</div>
        </div>  
      </Link>  
    </div>
  </>)
}
export default MatchCard