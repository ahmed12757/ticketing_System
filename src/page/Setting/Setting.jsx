import React, { useContext } from "react";
import UpdateUser from "../../Update/UpdateUser/UpdateUser";
import { Helmet } from "react-helmet";
import UpdatePassword from "../../Update/UpdatePassword/UpdatePassword";
import { UserContext } from "../../context/User.context";
import axios from "axios";
import toast from "react-hot-toast";

export default function Setting() {
  let { token, setToken } = useContext(UserContext);
  async function sendData() {
    const lodingToastId = toast.loading("waiting...");
    try {
      const options = {
        url: "http://localhost:9000/user/deleteProfile",
        method: "DELETE",
        headers: {
          token: `7ambola ${token}`,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);

      if (data.message === "deleted successfully") {
        toast.success("deleted successfully");
        setToken(null);
        localStorage.setItem("token", null);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message.message);
    } finally {
      toast.dismiss(lodingToastId);
    }
  }
  return (
    <>
      <Helmet>
        <title> Setting </title>
      </Helmet>
      <div className="bg-primary-500 flex flex-col items-center justify-center py-10 min-h-screen space-y-8">
        <UpdateUser />
        <UpdatePassword />
        <div className="w-[90%] flex items-center justify-start">
          <button
            onClick={() => {
              sendData();
            }}
            type=" submit "
            className=" ms-10 w-fit px-2 mt-0 bg-red-600 text-gray-100 font-bold text-lg  hover:bg-red-700 hover:transition hover:duration-300 duration-300 py-2 border-[.5px] border-primary-700   rounded-lg"
          >
            Delete Accounts
          </button>
        </div>
      </div>
    </>
  );
}
