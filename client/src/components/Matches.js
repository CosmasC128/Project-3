import Filters from './Filters'
import React, { useState, useEffect } from 'react'
import MatchCard from './MatchCard.js'
import axios from 'axios'

const Matches = () => {

  const [ matches, setMatches ] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/matches')
        setMatches(Object.values({ ...data }))
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  const [ searchMatches, setSearchMatches ] = useState([])
  const [ filters, setFilters ] = useState({ searchTerm: '' })
  const [ sortBy, setSortBy ] = useState('createdAt')
  const [ sortedArray, setSortedArray ] = useState([])

  // cosmas - notes to myself - add DATE as default sort

  const handleFilterChange = (event) => {
    const newObj = { ...filters, [event.target.name]: event.target.value }
    setFilters(newObj)
  }
  const handleSortBy = (event) => {
    setSortBy(event.target.value)
  }

  const whichSort = (array, sortBy) => {
    if (sortBy === 'views' || sortBy === 'rating' || sortBy === 'createdAt'){
      return array.sort((a,b)=> (a[sortBy] < b[sortBy] ? 1 : -1))
    } else {
      return array.sort((a,b)=> (a[sortBy] > b[sortBy] ? 1 : -1))
    }
  }

  useEffect(() => {
    setSortedArray(whichSort(matches, sortBy))
  }, [sortBy, matches])

  useEffect(() => {
    const regexSearch = new RegExp(filters.searchTerm, 'i')
    setSearchMatches((sortedArray ? sortedArray : whichSort(matches, sortBy)).filter(match => {
      return regexSearch.test(match.title)
    }))
  }, [filters, sortBy, sortedArray, matches])

  return (<>
    <h1 id="homeTitle">See all the Matches!</h1>
    <div className="matchesWrapper">
      <Filters handleFilterChange={handleFilterChange} handleSortBy={handleSortBy} {...filters}/>
      <div className="matchesGrid">
        { (filters.searchTerm !== '' ? searchMatches : sortedArray ).map(match => { 
          return <MatchCard key={match.id} { ...match } />
        })}
      </div>
    </div>
  </>)
}
export default Matches