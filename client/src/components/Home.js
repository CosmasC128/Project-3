import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {

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

  let topFive = []
  if (matches){
    topFive = (matches.sort((a,b)=> (a['rating'] < b['rating'] ? 1 : -1)).slice(0,5))
  }

  return (
    <div className='bg' style={{
      backgroundImage: 'url(https://www.theloadout.com/wp-content/uploads/2020/09/league-of-legends-worlds-2020-shanghai.jpg)',
    }} >
      <div id="homeTitles"> 
        <h1 className='homeTitle'> 🔥 GCW Fire Esports 🔥</h1>
        <h2 className="homeFlavour">Catch up with the weeks hottest E-Sport Action</h2>
      </div>
      { matches.length ?
        <section id="homeSection">
          <div className="topGames" >
            <div className="hl-games-list-item">
              <Link to={`/matches/${ topFive[0]._id }`}>
                <img className="homeImages" src={ topFive[0].thumbNail } alt="Game"></img>
              </Link>  
            </div>
            <div className="hl-games-list-item">
              <Link to={`/matches/${ topFive[1]._id }`}>
                <img className="homeImages" src={ topFive[1].thumbNail } alt="Game"></img>
              </Link>
            </div>
            <div className="hl-games-list-item">
              <Link to={`/matches/${ topFive[2]._id }`}>
                <img className="homeImages" src={ topFive[2].thumbNail } alt="Game"></img>
              </Link>
            </div>
            <div className="hl-games-list-item">
              <Link to={`/matches/${ topFive[3]._id }`}>
                <img className="homeImages" src={ topFive[3].thumbNail } alt="Game"></img>
              </Link>
            </div>
            <div className="hl-games-list-item">
              <Link to={`/matches/${ topFive[4]._id }`}>
                <img className="homeImages" src={ topFive[4].thumbNail } alt="Game"></img>
              </Link>
            </div>
          </div>
        </section>
        :
        <></>
      }
    </div>
  )
}

export default Home