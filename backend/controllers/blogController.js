import slugify from "slugify";
import BLOG from "../models/blog.js";

export const addBlog = async (req, res) => {


  try {
    const { title, description, metaTitle, metaDescription, metaKeywords, status } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    const slug = slugify(title, { lower: true, strict: true });

    const blog = await BLOG.create({
      title,
      description,
      image: `/uploads/${req.file.filename}`,
      slug,
      metaTitle,
      metaDescription,
      metaKeywords: metaKeywords ? metaKeywords.split(",") : [],
      status,
    });

    res.status(200).json({
      success: true,
      message: "Blog added successfully!",
      blog,
    });
  } catch (error) {
    console.log("error in add blog", error)
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await BLOG.find().sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get a single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BLOG.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get a single blog by slug (SEO friendly)
export const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await BLOG.findOne({ slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Update a blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, metaTitle, metaDescription, metaKeywords, status } = req.body;

    const blog = await BLOG.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    const updateData = {
      title,
      description,
      metaTitle,
      metaDescription,
      metaKeywords: metaKeywords ? metaKeywords.split(",") : [],
      status,
    };

    // If title changed, update slug
    if (title && title !== blog.title) {
      updateData.slug = slugify(title, { lower: true, strict: true });
    }

    // If new image is uploaded, update image path
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedBlog = await BLOG.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({
      success: true,
      message: "Blog updated successfully!",
      blog: updatedBlog,
    });
  } catch (error) {
    console.log("error in update blog", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BLOG.findById(id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    // Optionally delete image from uploads folder
    // import fs from "fs";
    // fs.unlinkSync(`.${blog.image}`);

    await BLOG.findByIdAndDelete(id);
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
