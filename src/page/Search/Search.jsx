import React, { useContext } from "react";
import { TicketContext } from "../../context/Ticket.comntext";
import TicketCard from "../../components/TicketCard/TicketCard";
import Loader from "../../components/Loding/Loding";

export default function Search() {
  const { searchTicket, search } = useContext(TicketContext);
  return (
    <>
      <div className=" mt-18 h-screen">
        <div className=" flex justify-center items-center text-gray-50">
          <input
            onChange={(e) => searchTicket(e.target.value)}
            type="search"
            placeholder="Search Ticket Number"
            className=" focus:outline-0 px-2  py-2  focus:!bg-transparent focus:border-1 border rounded-xl  border-gray-200 placeholder:text-gray-200"
          />
        </div>
        <div className=" grid grid-cols-12 text-center mt-2 gap-x-1 ">
          <h3 className="col-span-2 bg-gray-200 h-fit py-3 ps-1 ">Number</h3>
          <h3 className="col-span-5 bg-gray-200 h-fit py-3 ps-1 ">
            Ticket Number
          </h3>
          <h3 className="col-span-3 bg-gray-200 h-fit py-3">Title</h3>

          <h3 className="col-span-2 bg-gray-200 h-fit py-3 pl-1">Status</h3>
        </div>
        {search ? <TicketCard ticket={search} index={``} /> : ``}
      </div>
    </>
  );
}
