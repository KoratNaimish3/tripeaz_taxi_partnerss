import express from 'express'
import authAdmin from '../middleware/adminAuth.js'
import { adminLogin, adminLogout, isAdminAuth } from '../controllers/adminController.js'

const adminRouter = express.Router()

adminRouter.post('/login', adminLogin)
adminRouter.get('/auth', authAdmin, isAdminAuth)
adminRouter.get('/logout', adminLogout)

export default adminRouter