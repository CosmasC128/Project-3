import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {

  // cool pictures and descript of the purpose

  const [ matches, setMatches ] = useState([])

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('/api/matches')
      setMatches(data)
    }
    getData()
  }, [])

  return (<>
    <div>Hello home page!</div>
    {matches.map(match => {
      return <h2 key={match._id}>{match.title}</h2>
    })}
  </>)
}

export default Home