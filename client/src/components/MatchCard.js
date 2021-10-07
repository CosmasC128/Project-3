import React from 'react'
import { Link } from 'react-router-dom'
import flame from '../images/fire.png'

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
      <Link to={`/matches/${ id }`} id="cardLink">
        <div id="cardTitle">{ title.slice(0, 18) }</div>
        <img className="thumbnail" src={thumbNail} alt="match thumbnail"></img>
        <div className="matchCardData">
          <div id="cardRating">
            <img id="cardFlame"src={flame} className='flaming'/>
            <div id="cardRating">{rating}%</div>
          </div>
          <div id="cardViews">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" id="cardEye" viewBox="0 0 16 16">
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
            </svg>
            <div id="cardViewsNumber">{views}</div>
          </div>
        </div>  
      </Link>  
    </div>
  </>)
}
export default MatchCard