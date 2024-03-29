// import { useEffect, useState } from 'react';
// import { avatar2, search } from '../assets';
import PropTypes from "prop-types";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = ({ title }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // console.log(auth)

  const user = auth.user

  const setActiveMenu = () => {
    dispatch({
      type: "setActiveMenu",
    });
  };

  return (
    <nav className="flex justify-between items-center sticky z-10 bg-[#F8F8F9] px-8 py-4 rounded-2xl">
      {auth.authenticate ? (
        <>
          <button onClick={() => setActiveMenu((prev) => !prev)}>Menu</button>
          <div className="font-bold text-2xl tracking-wide mr-4">
            {title ? title : "Dashboard"}
          </div>

          <div className="hidden w-[250px] lg:flex rounded-2xl bg-[#ededed] px-3">
            {/* <img src={search} alt='search' width='16px' /> */}
            <input
              type="text"
              className="outline-none border-none bg-transparent p-2 w-full text-[13px] font-bold tracking-widest"
              placeholder="Search here"
            />
          </div>

          <div className="flex items-center">
            <div className="hidden text-xl mx-4 relative sm:flex cursor-pointer">
              <IoMdNotificationsOutline />
              <span className="absolute w-4 h-4 bg-red-600 -top-1 left-2 rounded-full text-[10px] flex justify-center items-center">
                5
              </span>
            </div>
            <div className="xs:flex justify-center items-center mx-4 cursor-pointer">
              <Link to="/profile">
                <button className="text-[14px] m-0 px-6 py-2 rounded-full bg-slate-200">
                  {user.name}
                </button>
              </Link>
              &nbsp;&nbsp;
              {/* <img src={avatar2} width='30px' /> */}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="font-bold text-3xl m-1 tracking-wide">
            <h2>Correctional Compass</h2>
          </div>
          <div className="flex justify-between items-center gap-8">
            <Link
              to="/login"
              className="p-2 px-6 rounded-full bg-[#5C8D7B] font-bold tracking-wide text-sm"
            >
              Login
            </Link>
          </div>
        </>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
};

export default Navbar;
