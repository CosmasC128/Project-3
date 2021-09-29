import Match from '../models/match.js'


//getAllMatches, createMatch, deleteMatch, 
// methods admin in /matches

export const getAllMatches = async (_req, res) => {
  // Below is the mongoose find method. It just returns every document in a collection.
  // In this case, we're querying the Movie model we created above
  const matches = await Match.find() // Get all the matches on the movie collection and return
  console.log(matches)
  console.log('GET MATCHES ->', matches)
  return res.status(200).json(matches)
}

// change this to createMatch for admin in /matches
export const createMatch = async (req, res) => {
  try {
    const adminMatch = { ...req.body, owner: req.currentUser._id }
    
    // ~~~ user authorization validation
    if (!adminMatch.owner.equals('admin')) throw new Error('Unauthorised')    

    const matchToAdd = await Match.create(adminMatch)
    res.status(201).json(matchToAdd)
  } catch (err) {
    console.log('Failed to add match')
    console.log(err)
    return res.status(422).json(err)
  }
}

// delete for admins in /matches
export const deleteMatch = async (req, res) => {
  const { id } = req.params
  try {
    const movieToDelete = await Movie.findById(id)

    if (!movieToDelete) throw new Error('Movie not found')
    if (!movieToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    
    await movieToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    console.log('🆘 Movie not deleted')
    console.log(err)
    return res.status(404).json({ message: 'Movie not found or deleted', errors: err.message })
  }
}

// ~~~~~~~~~~~ METHODS FOR /maches/:id
// getSingleMatch, createComment, deleteComment

export const getSingleMatch = async (req, res) => {
  try {
    const { id } = req.params
    const movie = await Movie.findById(id).populate('owner').populate('reviews.owner') // populate owner of movie and owner for each review
    // console.log(movie)
    return res.status(200).json(movie)
  } catch (err) {
    console.log('🆘 Error finding single movie')
    console.log(err)
    return res.status(404).json({ message: 'Movie not found', errors: err })
  }
}


export const createComment = async (req, res) => {
  const { id } = req.params
  try {
    const movie = await Movie.findById(id) // Find movie with id in params
    if (!movie) throw new Error()
    const newReview = { ...req.body, owner: req.currentUser._id } // Creating a review based on the req.body and the req.currentUser
    movie.reviews.push(newReview) // Pushing review to the reviews array on the movie document
    await movie.save() // Saving the movie document
    return res.status(200).json(movie) // Return movie to user
  } catch (err) {
    console.log('🆘 Review not added')
    console.log(err)
  }
}

// DELETE /movies/:id/reviews/:reviewId
// Look inside the specified movie, and find a review relating to reviewId
// If the review is owned by the requester, we will then delete it
export const deleteComment = async (req, res) => {
  const { id, reviewId } = req.params
  try {
    const movie = await Movie.findById(id) // Finding the movie from the id in the params
    if (!movie) throw new Error('Movie not found') // Throw an error if movie not found
    const reviewToDelete = movie.reviews.id(reviewId) // find the review from the reviewId in the params
    if (!reviewToDelete) throw new Error('Review not found') // Throw an error if the review was not found
    if (!reviewToDelete.owner.equals(req.currentUser._id) && !movie.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    await reviewToDelete.remove() // Removing the review from the movie document
    await movie.save() // Saving the movie document
    return res.sendStatus(204) // Sending a response of 204 No Content
  } catch (err) {
    console.log('🆘 Review was not deleted!')
    console.log(err.message)
    return res.status(404).json(err.message)
  }
}