import { Outlet } from "react-router-dom";
import Said from "../SaidBar/Said";
import Navbar from "../Nanbar/Navbar";
import AddTicket from "../AddTicket/AddTicket";
import { useContext } from "react";
import { TicketContext } from "../../context/Ticket.comntext";
import Search from "../../page/Search/Search";

export default function Layout() {
  let { showen } = useContext(TicketContext);
  return (
    <>
      <div className="flex bg-primary-500">
        <Said />
        <Navbar />
        <div
          className={` justify-center items-center flex w-full ${
            showen ? ` inline-block  absolute z-30` : `hidden`
          }`}
        >
          <AddTicket />
        </div>

        <div className=" w-full ">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
