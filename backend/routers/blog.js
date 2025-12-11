import express from "express";
import multer from "multer";
import { upload } from "../middleware/multer.js";
import { addBlog, getAllBlogs, getBlogById, getBlogBySlug, updateBlog, deleteBlog } from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.post("/add", upload.single("image"), addBlog);
blogRouter.get("/all", getAllBlogs);
blogRouter.get("/slug/:slug", getBlogBySlug);
blogRouter.put("/update/:id", upload.single("image"), updateBlog);
blogRouter.delete("/delete/:id", deleteBlog);

export default blogRouter;
