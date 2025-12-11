import express from "express";
import { signup, login, logout, isAuthUser } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const userRoute = express.Router();

userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.get("/logout", protect ,logout);
userRoute.get("/auth", protect ,isAuthUser);

export default userRoute;

