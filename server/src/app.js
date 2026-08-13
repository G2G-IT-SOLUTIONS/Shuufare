import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import path from 'path'
import { fileURLToPath } from 'url'

import apiRoutes from './routes/routes.js'
import notFound from './middleware/notFound.js'
import errorHandler from './middleware/errorHandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
dotenv.config()

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}))

app.use(cookieParser())
app.use(express.json())

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}))

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/', apiRoutes)
app.use(notFound)
app.use(errorHandler)

export default app