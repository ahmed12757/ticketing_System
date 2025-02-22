import React from "react";
import { Helmet } from "react-helmet";

export default function TicketCard({ ticket, index }) {
  const { title, ticketNumber, ticketStatus } = ticket;
  return (
    <>
      <Helmet>
        <title>Ticket</title>
      </Helmet>
      <div className=" grid grid-cols-12 text-center text-primary-700 gap-x-1 mt-1   ">
        <h3 className="col-span-2 bg-gray-300 h-fit py-3 "> {index + 1} </h3>
        <h3 className="col-span-5 bg-gray-300 h-fit py-3 "> {ticketNumber} </h3>
        <h3 className="col-span-3 bg-gray-300 h-fit py-3">{title}</h3>
        <h3 className="col-span-2 bg-gray-300 h-fit py-3">{ticketStatus}</h3>
      </div>
    </>
  );
}
