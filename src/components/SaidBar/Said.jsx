import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/User.context";

export default function Said() {
  let { logout } = useContext(UserContext);
  return (
    <>
      <div
        className={`said fixed left-0 top-0 bottom-0 h-screen flex  flex-col  items-center justify-around py-8 px-4 bg-gray-400 w-[60px] z-50`}
      >
        <div
          className={`flex flex-col justify-between py-7 items-center h-full text-gray-800 font-semibold `}
        >
          <h1>logo</h1>
          <div className="flex flex-col h-72 space-y-12 font-bold text-xl">
            <div className="dashboard relative group/dashboard w-fit text-black hover:text-gray-50 hover:transition-colors hover:duration-75 duration-75 cursor-pointer after:w-4 after:h-4 after:bg-primary-200  after:absolute after:top-[29px] after:rotate-45 after:right-[9%]  after:opacity-0 hover:after:opacity-100">
              <NavLink to={``}>
                <i class="fa-solid fa-server"></i>{" "}
                <p
                  className={`font-normal flex justify-center items-center text-md h-0 text-gray-50 group-hover/dashboard:h-8 group-hover/dashboard:py-1 group-hover/dashboard:transition-all group-hover/dashboard:duration-300  duration-300 overflow-hidden text-center w-fit px-2 rounded-lg translate-x-[-10%] py-0 bg-primary-200 absolute top-[33px] z-10  `}
                >
                  Dashboard
                </p>
              </NavLink>
            </div>
            <div className="tickets relative group/tickets w-fit text-black hover:text-gray-50 hover:transition-colors hover:duration-75 duration-75 cursor-pointer after:w-4 after:h-4 after:bg-primary-200  after:absolute after:top-[26px] after:rotate-45 after:right-[9%]  after:opacity-0 hover:after:opacity-100">
              <NavLink to={`/ticket`}>
                <i class="fa-solid fa-ticket"></i>{" "}
                <p
                  className={`font-normal flex justify-center items-center text-md h-0 text-gray-50 group-hover/tickets:h-8 md:group-hover/tickets:py-1 group-hover/tickets:transition-all group-hover/tickets:duration-300 duration-300   overflow-hidden text-center w-fit px-2 rounded-lg translate-x-[-10%] py-0 bg-primary-200 absolute top-[30px] z-10  `}
                >
                  Tickets
                </p>
              </NavLink>
            </div>
            <div className="search relative group/tickets w-fit text-black hover:text-gray-50 hover:transition-colors hover:duration-75 duration-75 cursor-pointer after:w-4 after:h-4 after:bg-primary-200  after:absolute after:top-[26px] after:rotate-45 after:right-[9%]  after:opacity-0 hover:after:opacity-100">
              <NavLink to={`/search`}>
                <i class="fa-solid fa-magnifying-glass"></i>{" "}
                <p
                  className={`font-normal flex justify-center items-center text-md h-0 text-gray-50 group-hover/tickets:h-8 md:group-hover/tickets:py-1 group-hover/tickets:transition-all group-hover/tickets:duration-300 duration-300   overflow-hidden text-center w-fit px-2 rounded-lg translate-x-[-10%] py-0 bg-primary-200 absolute top-[30px] z-10  `}
                >
                  Search
                </p>
              </NavLink>
            </div>

            {/* setting */}
            <div className="setting relative group/setting w-fit text-black hover:text-gray-50 hover:transition-colors hover:duration-75 duration-75 cursor-pointer after:w-4 after:h-4 after:bg-primary-200  after:absolute after:top-[29px] after:rotate-45 after:right-[9%]  after:opacity-0 hover:after:opacity-100 ">
              <NavLink to={`/setting`}>
                <i class="fa-solid fa-gear "></i>{" "}
                <p
                  className={`font-normal  flex justify-center items-center text-md h-0 text-gray-50 group-hover/setting:h-8 group-hover/setting:py-1 group-hover/setting:transition-all group-hover/setting:duration-300  duration-300 overflow-hidden text-center w-fit px-2 rounded-lg translate-x-[-10%] py-0 bg-primary-200 absolute top-[33px] z-10  `}
                >
                  Setting
                </p>
              </NavLink>
            </div>
          </div>
          <div
            onClick={logout}
            className="font-bold text-xl setting relative group/setting w-fit text-black hover:text-red-500 hover:transition-colors hover:duration-75 duration-75 cursor-pointer after:w-4 after:h-4 after:bg-primary-200  after:absolute after:top-[29px] after:rotate-45 after:right-[9%]  after:opacity-0 hover:after:opacity-100 "
          >
            <i class="fa-solid fa-right-from-bracket "></i>
            <p
              className={`font-normal flex justify-center items-center text-md  h-0 text-red-600 group-hover/setting:h-8 group-hover/setting:py-1 group-hover/setting:transition-all group-hover/setting:duration-300  duration-300 overflow-hidden text-center w-fit px-2 rounded-lg translate-x-[-10%] py-0 bg-primary-200 absolute top-[33px] z-10  `}
            >
              Logout
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
