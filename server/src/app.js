const express = require('express')
const cors = require('cors')
require('./config/env')

const apiRoutes = require('./routes')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api', apiRoutes)
app.use(notFound)
app.use(errorHandler)

module.exports = app