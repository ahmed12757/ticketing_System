import React, { useContext } from "react";
import TicketCard from "../../components/TicketCard/TicketCard";
import Loader from "../../components/Loding/Loding";
import { TicketContext } from "../../context/Ticket.comntext";
import Search from "../Search/Search";

export default function Ticket() {
  const { ticket } = useContext(TicketContext);
  return (
    <>
      {ticket ? (
        <>
          <div className=" min-h-screen mt-18  ms-14 text-[12px] font-bold md:font-bold md:text-xl text-primary-500 ">
            <div className=" grid grid-cols-12 text-center gap-x-1 ">
              <h3 className="col-span-2 bg-gray-200 h-fit py-3 ps-1 ">
                Number
              </h3>
              <h3 className="col-span-5 bg-gray-200 h-fit py-3 ps-1 ">
                Ticket Number
              </h3>
              <h3 className="col-span-3 bg-gray-200 h-fit py-3">Title</h3>

              <h3 className="col-span-2 bg-gray-200 h-fit py-3 pl-1">Status</h3>
            </div>
            {ticket.map((ticket, index) => (
              <TicketCard ticket={ticket} index={index} key={ticket._id} />
            ))}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
