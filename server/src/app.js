import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import apiRoutes from './routes/routes.js'
import notFound from './middleware/notFound.js'
import errorHandler from './middleware/errorHandler.js'

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/', apiRoutes)
app.use(notFound)
app.use(errorHandler)

export default app