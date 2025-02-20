import React, { useContext } from "react";
import { UserInfoContext } from "../../context/userInfo.context";

export default function Navbar() {
  let { name, userImage } = useContext(UserInfoContext);

  return (
    <>
      <div className=" fixed top-0 left-0 right-0 w-full bg-gray-300 py-2">
        <div className="  flex items-center justify-end gap-4 px-5  ">
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
