// Blog.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import axios from "../../helpers/axios";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Adjust the format as needed
}

function Blog() {
  const auth = useSelector((state) => state.auth);
  const user = auth.user;
  const { activeMenu } = useSelector((state) => state.activeMenu);
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/blog/");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [sending]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/blog/create", {
        title: formData.title,
        content: formData.content,
        author: auth.user._id, // Assuming auth.user contains the current user's data
      });
      console.log("Blog post created:", response.data);
      // You can add logic here to handle success, such as showing a success message or refreshing the blog posts
    } catch (error) {
      console.error("Error creating blog post:", error);
      // You can add logic here to handle errors, such as showing an error message
    }
    setSending(true)
    setFormData({ title: "", content: "" });
    setShowForm(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  return (
    <div className="max-w-screen relative z-0 bg-gradient-to-r from-zinc-200 via-blue-100 to-zinc-200  min-h-screen p-4 flex transition-all duration-300">
      <div className="flex relative mr-4">{activeMenu && <Sidebar />}</div>
      <div className="flex-1 flex flex-col">
        <Navbar title="Blog" className="md:justify-center" />
        <div>
          <div className="container flex flex-row mx-auto">
            {posts.map((post) => (
              <div
                key={post._id}
                className="border border-gray-200 rounded p-4 mb-4"
              >
                <div className="flex flex-col bg-gray-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-2">
                    Author: {post.author.name}
                  </p>
                  <p className="mb-2">Date: {formatDate(post.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button
              className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={toggleForm}
            >
              Add Blog
            </button>
          </div>
          {showForm && (
            <form className="container mx-auto mt-4" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="btn mr-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                  onClick={closeForm}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blog;
