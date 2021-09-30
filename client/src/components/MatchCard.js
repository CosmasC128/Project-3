import React from 'react'

const MatchCard = ({ matchesArray }) => {
  // interact with database for title, url, and fire rating, match ID as well

  const title = 'game 5'
  const image = 'blah blah picture'
  const rating = '65%'

  console.log(matchesArray, 'from match card')
  //provide a link to the individual match
  // link + ID
  // api/matches/id -> links to individual match page

  return (<>
    <div className="cardWrapper">one match card</div>
    <div>{title}</div>
    <div>{image}</div>
    <div>{rating}</div>
  </>)
}
export default MatchCard