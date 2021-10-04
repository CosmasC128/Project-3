import Filters from './Filters'
import React, { useState, useEffect } from 'react'
import MatchCard from './MatchCard.js'
// import { Link } from 'react-router-dom'
// needs a way of filtering (search and select a sort method views/date/rating)
// interact with database, then map entries in matchesData to display each match card


const Matches = ({ matchesArray }) => {
  const [ filteredMatches, setFilteredMatches ] = useState([])
  const [ filters, setFilters ] = useState({ searchTerm: '' })
  const [ sortBy, setSortBy ] = useState('title')
  const [ sortedArray, setSortedArray ] = useState([])

  const handleFilterChange = (event) => {
    const newObj = { ...filters, [event.target.name]: event.target.value }
    setFilters(newObj)
  }

  const handleSortBy = (event) => {
    setSortBy(event.target.value)
  }
  useEffect(() => {
    setSortedArray(( filteredMatches.length ? filteredMatches : matchesArray ).sort((a,b)=> (a[sortBy] > b[sortBy] ? 1 : -1)))
  }, [sortBy, filteredMatches, matchesArray])

  useEffect(() => {
    const regexSearch = new RegExp(filters.searchTerm, 'i')
    setFilteredMatches(sortedArray.filter(match => {
      return regexSearch.test(match.title)
    }))
  }, [filters])

  return (<>
    <div>See all the Matches!</div>
    <div className="row">
      <Filters handleFilterChange={handleFilterChange} handleSortBy={handleSortBy} {...filters}/>
      { sortedArray.length && sortedArray.map(match => { 
        return <MatchCard key={match.id} { ...match } />
      })}
    </div>
  </>)
}
export default Matches