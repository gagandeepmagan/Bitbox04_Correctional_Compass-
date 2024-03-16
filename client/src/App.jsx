import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
import PropTypes from "prop-types";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Insights from "./pages/Insights";
import AllStaff from "./pages/AllStaff";
import Login from "./pages/Login";
import CreateStaff from "./pages/newStaff/CreateStaff";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecidPredictor from "./pages/recidPredictor/RecidPredictor";
import { isUserLoggedIn } from "./actions";
import Blog from "./pages/blog/blog";
import BlogPage from "./pages/BlogPage";

const RequireAuth = ({ children }) => {
  const user = window.localStorage.getItem("token");
  return user ? children : <Navigate to="/login" />;
};

const RequireAdminAuth = ({ children }) => {
  const user = window.localStorage.getItem("token");
  const admin = window.localStorage.getItem("isAdmin");
  if(admin === "false") toast.error("You are not authorized to view this page");
  return user && admin === "true" ? children : <Navigate to="/login" />;
};

RequireAuth.propTypes = {
  children: PropTypes.object.isRequired,
};

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/courses"
          element={
            <RequireAuth>
              <Courses />
            </RequireAuth>
          }
        />
        <Route
          path="/courses/:id"
          element={
            <RequireAuth>
              <Course />
            </RequireAuth>
          }
        />
        <Route
          path="/insights"
          element={
            <RequireAuth>
              <Insights />
            </RequireAuth>
          }
        />
        <Route
          path="/blog"
          element={
            <RequireAuth>
              <Blog />
            </RequireAuth>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <RequireAuth>
              <BlogPage />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/recidPredictor"
          element={
            <RequireAuth>
              <RecidPredictor />
            </RequireAuth>
          }
        />
        <Route
          path="/all-staff"
          element={
            <RequireAdminAuth>
              <AllStaff />
            </RequireAdminAuth>
          }
        />
        <Route
          path="/all-staff/new"
          element={
            <RequireAdminAuth>
              <CreateStaff />
            </RequireAdminAuth>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
