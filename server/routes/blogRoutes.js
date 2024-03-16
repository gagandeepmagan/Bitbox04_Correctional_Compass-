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
// Route to fetch a single blog post
blogRouter.get("/:id", async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).populate("author");
    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error("Error fetching blog post:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default blogRouter;
