import Filters from './Filters'
import React, { useState, useEffect } from 'react'
import MatchCard from './MatchCard.js'
// import { Link } from 'react-router-dom'
// needs a way of filtering (search and select a sort method views/date/rating)
// interact with database, then map entries in matchesData to display each match card


const Matches = ({ matchesArray }) => {

  const [ filteredMatches, setFilteredMatches ] = useState([])
  const [ filters, setFilters ] = useState({ searchTerm: '' })

  // Handle updates to select and text input
  const handleFilterChange = (event) => {
    const newObj = { ...filters, [event.target.name]: event.target.value }
    setFilters(newObj)
  }

  // Listening for updates on Matches and filters and updating filteredMatches
  useEffect(() => {
    const regexSearch = new RegExp(filters.searchTerm, 'i')
    setFilteredMatches(matchesArray.filter(match => {
      return regexSearch.test(match.title)
    }))
  }, [filters, matchesArray])

  return (<>
    <div>See all the Matches!</div>
    <div className="row">
      <Filters handleFilterChange={handleFilterChange} {...filters}/>
      { ( filters.searchTerm !== '' ? filteredMatches : matchesArray ).map(match => { 
        return <MatchCard key={match.id} { ...match } />
      })}
    </div>
  </>)
}
export default Matches