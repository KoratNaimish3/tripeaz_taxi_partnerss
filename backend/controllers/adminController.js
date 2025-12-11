import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Admin from '../models/admin.js'

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ 
                success: false, 
                message: "Email and password are required" 
            })
        }

        const admin = await Admin.findOne({ email })

        if (!admin) {
            return res.status(400).json({ success: false, message: "Invalid credential" })
        }

        const isMatch = await bcrypt.compare(password, admin.password)

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Password" })
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" })

        res.cookie("adminToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({ success: true , message: "Login successfully"})


    } catch (error) {
        console.log("Error in login(admin)  -> ", error.message)
        return res.status(500).json({ success: false, message: " Internal Server Error " })
    }
}

export const isAdminAuth = async (req, res) => {
    try {

        return res.status(200).json({ success: true })

    } catch (error) {

        console.log("Error in authAdmin -> ", error.message)
        return res.status(500).json({ success: false, message: " Internal Server Error " })

    }
}

export const adminLogout = async (req, res) => {
    try {
        res.clearCookie('adminToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',

        })
        return res.status(200).json({ success: true, message: " Logout Successfully" })

    } catch (error) {
        console.log("Error in Logout Seller  -> ", error.message)
        return res.status(500).json({ success: false, message: " Internal Server Error " })
    }
}

