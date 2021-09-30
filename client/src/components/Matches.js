import React from 'react'
import MatchCard from './MatchCard.js'
// import { Link } from 'react-router-dom'


// needs a way of filtering (search and select a sort method views/date/rating)

// interact with database, then map entries in matchesData to display each match card


const Matches = ({ matchesArray }) => {

  console.log(matchesArray, 'from matches')

  return (<>
    <div>See all the Matches!</div>
    <div className="row">
      { matchesArray.map(match => { 
        return <MatchCard key={match.id} { ...match } />
      })}
    </div><MatchCard />
  </>)
}
export default Matches