import React, { useContext } from "react";
import { UserInfoContext } from "../../context/userInfo.context";

import { TicketContext } from "../../context/Ticket.comntext";

export default function Navbar() {
  let { name, userImage } = useContext(UserInfoContext);
  let { showTicket } = useContext(TicketContext);

  return (
    <>
      <div className=" fixed top-0 left-0 right-0 w-full bg-gray-300 py-2">
        <div className="  flex items-center justify-between gap-4 px-5  ">
          <div
            onClick={showTicket}
            className=" cursor-pointer  ms-14 border-1 font-semibold text-gray-50 border-primary-500 px-2 py-1 rounded-lg bg-primary-500 hover:bg-transparent hover:text-primary-500 hover:transition-colors hover:duration-300 duration-300  "
          >
            Add Ticket
          </div>
          <div className="flex justify-between items-center gap-4">
            <h1 className={`font-semibold text-lg`}>{name}</h1>
            <div className="image w-[50px] h-[50px] rounded-full overflow-hidden border border-primary-400 ">
              <img src={userImage} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
