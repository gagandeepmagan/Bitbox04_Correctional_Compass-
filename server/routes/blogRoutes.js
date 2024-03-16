// routes/blogRoutes.js
import express from "express";
import BlogPost from "../mongodb/models/blog.js";
const blogRouter = express.Router();
// const blogController = require('../controllers/blogController');

// Import the BlogPost model

// Route to get all blog posts
blogRouter.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.find()
      .populate("author")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("Error fetching blog posts:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to create a new blog post
blogRouter.post("/create", async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const newPost = new BlogPost({ title, content, author });
    await newPost.save();
    res.status(201).json(newPost);
    console.log("blog created successfully");
  } catch (err) {
    console.error("Error creating blog post:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default blogRouter;
