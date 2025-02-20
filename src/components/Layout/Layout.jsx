import { Outlet } from "react-router-dom";
import Said from "../SaidBar/Said";
import Navbar from "../Nanbar/Navbar";

export default function Layout() {
  return (
    <>
      <div className="flex bg-gray-200">
        <Said />
        <Navbar />
        <div className=" w-full ">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}
