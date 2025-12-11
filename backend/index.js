import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './lib/db.js'
import blogRouter from './routers/blog.js'
import userRoute from './routers/user.js'
import adminRouter from './routers/admin.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 8000

connectDB()


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: true,
    credentials: true
}))

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// API Routes
app.use('/user', userRoute)
app.use('/blog', blogRouter)
app.use('/admin', adminRouter)

// Serve frontend build files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    
    // Handle React Router - serve index.html for all non-API routes
    app.get('*', (req, res, next) => {
        // Skip API routes and uploads
        if (req.path.startsWith('/user') || 
            req.path.startsWith('/blog') || 
            req.path.startsWith('/admin') || 
            req.path.startsWith('/uploads')) {
            return next()
        }
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
    })
} else {
    // Development mode - just show API status
    app.get('/', (req, res) => {
        res.send("API IS WORKING......")
    })
}


app.listen(PORT, () => console.log("SERVER started at PORT :", PORT))