import { useFormik } from "formik";
import { useContext, useState } from "react";
import { object, ref, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import axios from "axios";
import { UserContext } from "../../context/User.context";

export default function UpdatePassword() {
  let { token } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const validationSchema = object({
    password: string()
      .required("password is required")
      .matches(
        passwordRegex,
        "password | Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: function (values) {
      sendData(values);
    },
    validationSchema,
  });
  async function sendData(values) {
    const lodingToastId = toast.loading("waiting...");

    try {
      const options = {
        url: "http://localhost:9000/user/updatePass",
        method: "PUT",
        data: values,
        headers: {
          token: `7ambola ${token}`,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);

      if (data.message === "updated successfully") {
        toast.success("updated Successfully");
      }
    } catch (error) {
      toast.error(error.response.data.message.message);
    } finally {
      toast.dismiss(lodingToastId);
    }
  }

  return (
    <div className="w-[96%]  ms-14 ">
      <div className=" ">
        <div className="flex   items-center justify-center">
          <div className="grid  w-[100%] mx-10  grid-cols-12   shadow-md shadow-primary-900">
            <div className=" col-span-12   py-6 px-2">
              <div className="lg:px-11 md:px-4 px-4 sm:px-10  flex items-center space-y-8 justify-center flex-col h-full">
                <form
                  action=""
                  className=" space-y-3 w-full gap-x-4 mb-2 text-gray-100 grid grid-cols-12 "
                  onSubmit={formik.handleSubmit}
                >
                  <h1 className="text-gray-200 col-span-12 uppercase text-xl font-semibold text-center">
                    update password
                  </h1>
                  <div className="password  relative my-3  rounded-lg col-span-12">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="off"
                      placeholder="password"
                      className="w-full focus:outline-0 px-2 my-2 py-2  focus:!bg-transparent focus:border-1 border rounded-lg border-primary-100 placeholder:text-gray-300"
                      name="password"
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />

                    <i
                      onClick={togglePasswordVisibility}
                      className={
                        showPassword
                          ? `fa-solid fa-eye absolute  top-[50%]  right-[10px] -translate-y-[50%] cursor-pointer font-normal text-[13px]`
                          : `fa-solid fa-eye-slash absolute  top-[50%]  right-[10px] -translate-y-[50%] cursor-pointer font-normal text-[13px] `
                      }
                    ></i>
                  </div>

                  {formik.errors.password && formik.touched.password && (
                    <p className="text-gray-100 col-span-12 w-full font-semibold">
                      *{formik.errors.password}
                    </p>
                  )}
                  <div className="col-span-12">
                    <button
                      type=" submit "
                      className="mt-0 bg-primary-800 text-gray-100 font-bold text-lg  hover:bg-primary-900 hover:transition hover:duration-300 duration-300 py-2 border-[.5px] border-primary-700  w-full rounded-lg"
                    >
                      Save Change
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
