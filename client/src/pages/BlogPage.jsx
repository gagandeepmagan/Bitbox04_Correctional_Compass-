import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import TableList from "../components/table/TableList";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const { activeMenu } = useSelector((state) => state.activeMenu);


  

  return (
    <div className="relative z-0 bg-gradient-to-r from-zinc-200 via-blue-100 to-zinc-200  min-h-screen p-4 flex transition-all duration-300">
      <div className="flex relative mr-4">{activeMenu && <Sidebar />}</div>

      <div className="flex-1 flex flex-col">
        <Navbar title={"Staff List"} />

        
      </div>
    </div>
  );
};

export default BlogPage;