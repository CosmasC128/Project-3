import Filters from './Filters'
import React, { useState, useEffect } from 'react'
import MatchCard from './MatchCard.js'

const Matches = ({ matchesArray }) => {
  const [ searchMatches, setSearchMatches ] = useState([])
  const [ filters, setFilters ] = useState({ searchTerm: '' })
  const [ sortBy, setSortBy ] = useState('title')
  const [ sortedArray, setSortedArray ] = useState([])

  // cosmas - notes to myself - if the sort by is date, sort newest to old (add date as default)
  // if sort is by title, ascending alphabetical (a-z?)
  // if sort is by rating, sort 100  - 0

  const handleFilterChange = (event) => {
    const newObj = { ...filters, [event.target.name]: event.target.value }
    setFilters(newObj)
  }
  const handleSortBy = (event) => {
    setSortBy(event.target.value)
  }

  const whichSort = (array, sortBy) => {
    if (sortBy === 'views' || sortBy === 'rating'){
      return array.sort((a,b)=> (a[sortBy] < b[sortBy] ? 1 : -1))
    } else {
      return array.sort((a,b)=> (a[sortBy] > b[sortBy] ? 1 : -1))
    }
  }

  useEffect(() => {
    setSortedArray(whichSort(matchesArray, sortBy))
  }, [sortBy, matchesArray])

  useEffect(() => {
    const regexSearch = new RegExp(filters.searchTerm, 'i')
    setSearchMatches((sortedArray ? sortedArray : whichSort(matchesArray, sortBy)).filter(match => {
      return regexSearch.test(match.title)
    }))
  }, [filters, sortBy, sortedArray, matchesArray])

  return (<>
    <div>See all the Matches!</div>
    <div className="row">
      <Filters handleFilterChange={handleFilterChange} handleSortBy={handleSortBy} {...filters}/>
      { (filters.searchTerm !== '' ? searchMatches : sortedArray ).map(match => { 
        return <MatchCard key={match.id} { ...match } />
      })}
    </div>
  </>)
}
export default Matches