// import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import { courses } from "../constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Courses = () => {
  const { activeMenu } = useSelector(state => state.activeMenu);

  return (
    <div className="relative z-0 bg-gradient-to-r from-zinc-200 via-blue-100 to-zinc-200  min-h-screen p-4 flex transition-all duration-300">
      <div className="flex relative mr-4">
        {activeMenu && <Sidebar />}
      </div>

      <div className="flex-1 flex flex-col">
        <Navbar title={'All Courses'} />

        <div className="flex flex-wrap justify-center md:justify-start py-4">
          {/* <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard /> */}

          {courses.map((course, index) => (
            <Link key={index} to={`${course.id}`}>
              <CourseCard key={index} course={course} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
