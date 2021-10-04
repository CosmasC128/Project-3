import express from 'express'
<<<<<<< HEAD
import { getAllMatches, createMatch, deleteMatch, getSingleMatch, createComment, deleteComment } from '../controllers/matches.js' // Import our controllers
import { registerUser, loginUser, getCommentOwner } from '../controllers/auth.js'
=======
import { getAllMatches, createMatch, deleteMatch, getSingleMatch, addFire, createComment, deleteComment } from '../controllers/matches.js' // Import our controllers
import { registerUser, loginUser } from '../controllers/auth.js'
>>>>>>> 1e7e0918f5b59b57a319e8d01dff7eee9cd183a1
import { secureRoute } from './secureRoute.js'

const router = express.Router()

// ~~~~~~~~~

router.route('/matches') 
  .get(getAllMatches)
  .post(secureRoute, createMatch)

router.route('/matches/:id')
  .get(getSingleMatch)  
  .delete(secureRoute, deleteMatch) 
  .put(addFire)

// ~~~~~~~~~

router.route('/matches/:id/comments')
  .post(secureRoute, createComment)
  .get(getCommentOwner)

router.route('/matches/:id/comments/:commentId')
  .delete(secureRoute, deleteComment)
  
// ~~~~~~~~~

router.route('/login')
  .post(loginUser)

router.route('/register')
  .post(registerUser)

export default router