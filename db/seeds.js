import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'

// Models
import Match from '../models/match.js'
import User from '../models/user.js'

// Data
import userData from './data/usersD.js'
import matchData from './data/matchesD.js'


const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('Database connected')

    await mongoose.connection.db.dropDatabase()
    console.log('Dropped database')
    
    const users = await User.create(userData)

    // here we're seeding the database, so that all the matches manually input to start
    // are owned by admin.
    // later we should add a page, just for logged in admin, to upload/post new matches
    // so that they are default owned by admin (use a form)
    // remember to have view count and votes start at 0, not set by admin
    const matches = matchData.map(match => {
      match.owner = users[0]._id
      return match
    })

    const adminMatches = await Match.create(matches)
    console.log(typeof adminMatches, 'type of admin matches', `Database seeded with ${adminMatches.length} matches`)

    await mongoose.connection.close()
    console.log('Goodbye')
  } catch (err) {
    console.log('You failed')
    console.log(err)
    await mongoose.connection.close()
    console.log('Goodbye')
  }
}

seedDatabase()