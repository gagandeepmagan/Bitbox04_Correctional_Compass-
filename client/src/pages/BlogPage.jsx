import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import TableList from "../components/table/TableList";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../helpers/axios";

const BlogPage = () => {
  const { activeMenu } = useSelector((state) => state.activeMenu);
  const [post, setPost] = useState();
  const { id } = useParams()

  console.log(id)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/blog/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);



  return (
    <div className="relative z-0 bg-gradient-to-r from-zinc-200 via-blue-100 to-zinc-200  min-h-screen p-4 flex transition-all duration-300">
      <div className="flex relative mr-4">{activeMenu && <Sidebar />}</div>

      <div className="flex-1 flex flex-col">
        <Navbar title={"Staff List"} />

        <div className="m-3">
          <h3 className="text-6xl font-bold mx-auto">{post?.title}</h3>
          <h6 className="font-bold my-4">{post?.author?.name}</h6>
          <p>{post?.content}</p>
        </div>
        
      </div>
    </div>
  );
};

export default BlogPage;