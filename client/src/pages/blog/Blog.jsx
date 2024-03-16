import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../recidPredictor/recidPredictor.css";
// import Sidebar from "../../components/Sidebar";
// import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import axios from "../../helpers/axios";
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Adjust the format as needed
}

function Blog() {
  const auth = useSelector((state) => state.auth);
  const { activeMenu } = useSelector((state) => state.activeMenu);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/blog/");
        setPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-screen relative z-0 bg-gradient-to-r from-zinc-200 via-blue-100 to-zinc-200  min-h-screen p-4 flex transition-all duration-300">
      {/* <div className={`flex relative mr-4 ${isMdScreen ? "hidden" : ""}`}> */}
      <div className="flex relative mr-4">{activeMenu && <Sidebar />}</div>

      <div className="flex-1 flex flex-col">
        <Navbar title="Blog" className="md:justify-center" />
        <div className="container flex flex-row mx-auto">
          {posts.map((post) => (
            <div
              key={post._id}
              className="border border-gray-200 rounded p-4 mb-4"
            >
              <div className="flex flex-col w-[268px] h-[175px] bg-[#F8F8F9] rounded-xl p-4 m-4 mr-0 shadow-lg hover:shadow-[2px_1px_15px_3px_rgba(0,0,0,0.1)] hover:scale-105 transition ease-out duration-700 ">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-2">Author: {post.author.name}</p>
                <p className="mb-2">Date:{formatDate(post.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blog;
