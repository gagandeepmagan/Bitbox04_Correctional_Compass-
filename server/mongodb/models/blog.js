// models/BlogPost.js
import mongoose from 'mongoose';


const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

blogPostSchema.index({ createdAt: -1 });

blogPostSchema.statics = {
  async getAllPosts() {
    return this.find().populate('author').sort({ createdAt: -1 });
  }
};

blogPostSchema.pre('save', async function(next) {
  // Add any pre-processing logic here
  next();
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
export default BlogPost;
