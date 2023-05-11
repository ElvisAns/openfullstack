const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blog')
const mongoose = require('mongoose')
const errorLogger = require('./middleware/errorLogger')
const {MONGODB_URI,PORT} = require('./utils/config')


logger.info('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI).then((connexion)=>{
    logger.info("Connected to Mongo DB")
}).catch(error=>{
    logger.error("Error connecting to Mongo DB")
})

app.use(cors())
app.use(express.json())
app.use(errorLogger.requestLogger)
app.use('/api/blogs',blogRouter)
app.use(errorLogger.unknownEndpoint)
app.use(errorLogger.errorHandler)

module.exports = app