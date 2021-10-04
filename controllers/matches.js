import Match from '../models/match.js'
// import User from '../models/user.js'

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
    if (req.currentUser.username !== 'admin') throw new Error('Unauthorised')

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
    const matchToDelete = await Match.findById(id)

    if (!matchToDelete) throw new Error('Match not found')
    if (!matchToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorised')
    
    await matchToDelete.remove()
    console.log('Match successfully deleted!')
    return res.sendStatus(204)
  } catch (err) {
    console.log('Match not deleted')
    console.log(err)
    return res.status(404).json({ message: 'Match not found or deleted', errors: err.message })
  }
}

// ~~~~~~~~~~~ METHODS FOR /machtes/:id
// getSingleMatch

export const getSingleMatch = async (req, res) => {
  try {
    const { id } = req.params
    const match = await Match.findById(id) //.populate('owner') //.populate('comments.owner') // populate owner of match and owner for each review
    console.log(match)

    return res.status(200).json(match)
  } catch (err) {
    console.log('Error finding single Match')
    console.log(err)
    return res.status(404).json({ message: 'match not found', errors: err })
  }
}

export const addFire = async (req, res) => {
  const { id } = req.params
  try {
    const likes = await Match.findOneAndUpdate({ _id: id }, { ...req.body })
    return res.status(202).json(likes)
  } catch (err) {
    console.log(err, 'RIP--->')
    return res.status(404).json(err.message)
  }
}

// ~~~~~ comment stuff
// router.route('/matches/:id/comments')
export const createComment = async (req, res) => {
  const { id } = req.params
  try {
    const match = await Match.findById(id).populate('owner').populate('comments.owner') // Find match with id in params with owner and comment owner
    if (!match) throw new Error()
    const newComment = { ...req.body, owner: req.currentUser._id } // Creating a Comment based on the req.body and the req.currentUser
    match.comments.push(newComment) // Pushing Comment to the Comments array on the match document
    
    await match.save()
    return res.status(200).json(match)
  } catch (err) {
    console.log('Comment not added')
    console.log(err)
  }
}

// DELETE /matches/:id/comments/:commentId
// Look inside the specified movie, and find a comment relating to commentId
// If the comment is owned by the requester, we will then delete it
export const deleteComment = async (req, res) => {
  const { id, commentId } = req.params
  try {

    const match = await Match.findById(id)
    if (!match) throw new Error('Match not found')

    const commentToDelete = match.comments.id(commentId)

    if (!commentToDelete) throw new Error('Comment not found')
    if (!commentToDelete.owner.equals(req.currentUser._id) && req.currentUser.username !== 'admin') throw new Error('Unauthorised')

    await commentToDelete.remove()
    await match.save()
    return res.sendStatus(204)
  } catch (err) {
    console.log('Comment was not deleted!')
    console.log(err.message)
    return res.status(404).json(err.message)
  }
}


