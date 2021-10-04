import express from 'express'
import { getAllMatches, createMatch, deleteMatch, getSingleMatch, addFire, updateMatch, createComment, deleteComment } from '../controllers/matches.js' // Import our controllers
import { registerUser, loginUser } from '../controllers/auth.js'
import { secureRoute } from './secureRoute.js'

const router = express.Router()

// ~~~~~~~~~

router.route('/matches') 
  .get(getAllMatches)
  .post(secureRoute, createMatch)

router.route('/matches/:id')
  .get(getSingleMatch)  
  .delete(secureRoute, deleteMatch) 
  .put(addFire, updateMatch)

// ~~~~~~~~~

router.route('/matches/:id/comments')
  .post(secureRoute, createComment) 

router.route('/matches/:id/comments/:commentId')
  .delete(secureRoute, deleteComment)
  
// ~~~~~~~~~

router.route('/login')
  .post(loginUser)

router.route('/register')
.post(registerUser)

  export default router