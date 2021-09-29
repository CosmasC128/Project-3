import express from 'express'
import { getAllMatches, createMatch, deleteMatch, getSingleMatch, createComment, deleteComment, updateComment } from '../controllers/movies.js' // Import our controllers
import { registerUser, loginUser } from '../controllers/auth.js'
import { secureRoute } from './secureRoute.js'

const router = express.Router()

// ~~~~~~~~~

router.route('/matches') 
  .get(getAllMatches)
  .post(secureRoute, createMatch) // two 'admin' methods
  .delete(secureRoute, deleteMatch) // two 'admin' methods

router.route('/matches/:id')
  .get(getSingleMatch)
  .post(secureRoute, createComment) // three user methods
  .put(secureRoute, updateComment) // three user methods
  .delete(secureRoute, deleteComment) // three user methods

// ~~~~~~~~~

router.route('/login')
  .post(loginUser)

router.route('/register')
.post(registerUser)

  export default router