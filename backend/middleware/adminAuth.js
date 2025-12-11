import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

const authAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: "Not Authorized - Token Missing" 
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token Expired or Invalid"
      });
    }

    const admin = await Admin.findOne({ email: decoded.email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin does not exist"
      });
    }

    req.admin = admin;

    next();

  } catch (error) {
    console.log("Error in authAdmin:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

export default authAdmin;
