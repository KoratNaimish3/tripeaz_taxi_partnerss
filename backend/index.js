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


app.get('/', (req, res) => {
    res.send("API IS WORKING......")
})

app.use('/user', userRoute)
app.use('/blog', blogRouter)
app.use('/admin', adminRouter)


app.listen(PORT, () => console.log("SERVER started at PORT :", PORT))