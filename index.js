import express from 'express'
import mongoose from 'mongoose'
import { port, dbURI } from './config/environment.js'
import router from './config/router.js'

const app = express()

const startServer = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log('Database has connected successfully')

    app.use(express.json())
    app.use('/api', router)

    app.use((req, _res, next) => {
      console.log(`Request received: ${req.method} - ${req.url}`)
      next()
    })

    app.use((_req, res) => {
      return res.status(404).json({ message: 'Path not found' })
    })

    const server = app.listen(port, () => console.log(`🚀 Server up and running on port ${port}`)) // app.listen takes the port and starts the server up using express
    server.timeout = 1000

  } catch (err) {
    console.log("Something went wrong - couldn't connect")
    console.log(err)
  }
}

startServer()