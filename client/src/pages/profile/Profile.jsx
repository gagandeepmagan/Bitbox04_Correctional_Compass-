// import React from 'react'
import {
  profile1,
  crown,
  flag,
  medal,
  trophy,
  support,
  member,
  camera,
} from "./imports";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";

// const user = {
//   name: "Akshansh",
//   cprogress: "08",
//   ccomplete: "23",
// };

const Profile = () => {
  const auth = useSelector((state) => state.auth);

  const user = auth.user;

  const { activeMenu } = useSelector((state) => state.activeMenu);

  return (
    <div className="max-w-screen relative z-0 bg-gradient-to-r from-zinc-200 via-blue-100 to-zinc-200  min-h-screen p-4 flex transition-all duration-300">
      <div className="  flex relative mr-4">{activeMenu && <Sidebar />}</div>

      <div className="flex-1 flex flex-col">
        <Navbar title="Profile" className="md:justify-center" />

        <div className="flex  max-full flex-col mt-5 md:flex-row ">
          <div className="items-strech  md:mr-5  p-4 rounded-lg flex flex-col bg-white shadow-[0_0px_6px_3px_rgba(0,0,0,0.2)] md:p-6">
            {/* profile div */}
            <div className="flex flex-col items-center">
              {/* profile , name , pic vip */}
              <div>
                <img src={profile1} className="w-24 h-24 rounded-full" />
              </div>
              <p className=" cursor-default py-2">{user?.name}</p>
              <button className=" text-white bg-amber-600 hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-1 text-center mr-2 my-2.5 dark:bg-amber-600 dark:hover:bg-amber-600 dark:focus:ring-amber-600 ">
                VIP
              </button>
            </div>

            <div className=" justify-around    md:mx-6 mt-3 flex flex-row  space-x-3 lg:justify-between">
              <div className="flex flex-col items-center ">
                <button className=" rounded-full text-2xl  w-12 h-12 md:w-16 md:h-16 bg-indigo-200 text-indigo-400 font-extrabold ">
                  {user?.cprogress}
                </button>
                <p className="font-semibold">Course in progress</p>
              </div>
              <div className="flex flex-col items-center">
                <button className="rounded-full text-2xl w-12 h-12  md:w-16 md:h-16 bg-green-100 text-green-400 font-extrabold ">
                  {user?.ccomplete}
                </button>
                <p className="font-semibold">Course Complete</p>
              </div>

              {/* course in progress  course complete */}
            </div>

            <div>
              <p className="  cursor-default font-semibold  text-l md:text-2xl pt-8 ">
                Last Achievement
              </p>
              <div className="space-x-2 flex flex-row justify-around flex-wrap ">
                <div className="   mt-2 ">
                  <img
                    className="p-2 h-20 rounded-full bg-rose-100"
                    src={crown}
                  ></img>
                </div>
                <div className="mt-2 rounded-full bg-rose-100 ">
                  <img className="mx-2 px-1 w-16 p-2 " src={trophy}></img>
                </div>
                <div className="mt-2  ">
                  <img
                    className="w-20 h-20 p-2 rounded-full bg-rose-100"
                    src={flag}
                  ></img>
                </div>
                <div className="\ mt-2  ">
                  <img
                    className="w-20 h-20 p-2 rounded-full bg-rose-100"
                    src={medal}
                  ></img>
                </div>
              </div>
              {/* Achivements */}
            </div>

            <div>
              <p className="font-semibold text-2xl py-5">Support</p>
              <div className="flex flex-col justify-between ">
                <div className=" cursor-pointer flex flex-row mb-4">
                  <div className="">
                    <img
                      className=" w-12 h-12 p-2 rounded-full bg-sky-100"
                      src={member}
                    ></img>
                  </div>
                  <p className="font-medium pl-4 self-center">
                    Become a member
                  </p>
                </div>

                <div className=" cursor-pointer flex flex-row ">
                  <div className=" ">
                    <img
                      className=" w-12 h-12 bg-indigo-200  p-2 rounded-full "
                      src={support}
                    ></img>
                  </div>
                  <p className="font-medium pl-4 self-center">Support</p>
                </div>
                {/* <div className="flex flex-row pb-4">
                      <div className="w-12 h-12 ">
                        <img className="p-2 rounded-full bg-rose-100" src={member}></img>
                      </div>
                        <p className="font-medium pl-4 self-center">Invite friend</p>
                    </div> */}
              </div>
            </div>
          </div>
          <form className="flex-auto md:mr-6">
            <div className=" my-4 md:my-0 h-full max-w-5xl md:w-full  lg:ml-4  rounded-lg flex flex-col p-4 bg-white shadow-[0_0px_6px_3px_rgba(0,0,0,0.2)] ">
              <div className="mb-10">
                <p className="font-semibold text-xl ">Profile Setting</p>
              </div>
              <div className=" relative w-[6.8rem] h-[6.9rem] ">
                <img
                  src={profile1}
                  className="w-24 h-24  rounded-full absolute"
                />
                <img
                  src={camera}
                  className="   border-none  p-1 rounded-full bottom-0 right-2 w-12 cursor-pointer absolute "
                />
              </div>
              <div className="md:space-y-6  space-y-2 mt-4 flex flex-col">
                <div className="flex  flex-wrap flex-row  space-x-0 justify-between">
                  <div className=" w-1/2  flex flex-col rounded-lg border border-slate-300 ">
                    <label
                      className=" pl-4 uppercase tracking-wide text-gray-400 text-xs font-semibold my-2.5"
                      htmlFor="full_name"
                    >
                      Full Name
                    </label>
                    <div className=" font-semibold placeholder-black appearance-none border-none rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
                      {user?.name}
                    </div>
                  </div>

                  <div className="w-1/2  flex flex-col rounded-lg border border-slate-300 ">
                    <label
                      className=" pl-4 uppercase tracking-wide text-gray-400 text-xs font-semibold my-2.5"
                      htmlFor="staff_id"
                    >
                      Staff-ID
                    </label>
                    <div className="font-semibold placeholder-black appearance-none border-none rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
                      {user?._id}
                    </div>
                  </div>
                </div>
                <div className="flex  flex-wrap flex-row  space-x-0 justify-between">
                  <div className="w-1/2 flex flex-col rounded-lg border border-slate-300 ">
                    <label
                      className=" pl-4 uppercase tracking-wide text-gray-400 text-xs font-semibold my-2.5"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <div className="font-semibold placeholder-black appearance-none border-none rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
                      {user?.email}
                    </div>
                  </div>
                  <div className="w-1/2  flex flex-col rounded-lg border border-slate-300 ">
                    <label
                      className=" pl-4 uppercase tracking-wide text-gray-400 text-xs font-semibold my-2.5"
                      htmlFor="phone_number"
                    >
                      Phone Number
                    </label>
                    <div
                      className="font-semibold placeholder-black appearance-none border-none rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    >{user?.contactNumber}</div>
                  </div>
                </div>

                <div className="flex flex-col rounded-lg border border-slate-300 ">
                  <label
                    className=" pl-4 uppercase tracking-wide text-gray-400 text-xs font-semibold my-2.5"
                    htmlFor="address"
                  >
                    Address
                  </label>
                  <div
                    className="font-semibold placeholder-black appearance-none border-none rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  >{user?.address}</div>
                </div>
                <div className="flex  flex-wrap flex-row  space-x-0 justify-between">
                  <div className="w-1/2  flex flex-col rounded-lg border border-slate-300 ">
                    <label
                      className=" pl-4 uppercase tracking-wide text-gray-400 text-xs font-semibold my-2.5"
                      htmlFor="city"
                    >
                      City
                    </label>
                    <div className="font-semibold placeholder-black appearance-none border-none rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
                      {user?.city}
                    </div>
                  </div>
                  <div className="w-1/2  flex flex-col rounded-lg border border-slate-300 ">
                    <label
                      className=" pl-4 uppercase tracking-wide text-gray-400 text-xs font-semibold my-2.5"
                      htmlFor="state"
                    >
                      State/Province
                    </label>
                    <div
                      className="font-semibold placeholder-black appearance-none border-none rounded  px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    >{user?.state}</div>
                  </div>
                </div>
              </div>
              {/* <div className="mt-8  w-full   flex  flex-row   justify-between">
                <button
                  className="w-1/2 py-3 text-white font-semibold bg-[#4ec490] transition-shadow rounded-lg hover:shadow-[4px_6px_7px_4px_rgba(78,196,144,0.14)]"
                  type="submit"
                  id="save"
                >
                  Save Profile
                </button>
                <button
                  className=" w-1/2 font-semibold border-green-400 text-green-400 border-[1.6px] rounded-lg py-1 "
                  type="reset"
                  id="cancel"
                >
                  Cancel
                </button>
              </div> */}

              {/* Profile Setting */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
