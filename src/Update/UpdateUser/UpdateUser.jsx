import { useFormik } from "formik";

import { useState } from "react";
import { object, ref, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/User.context";
import { UserInfoContext } from "../../context/userInfo.context";

export default function UpdateUser() {
  let { name, email, userImage } = useContext(UserInfoContext);
  let { token } = useContext(UserContext);
  const [preview, setPreview] = useState(userImage);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue("image", file);

    if (file) {
      setImage("preview", file);
      formik.setFieldValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const navigate = useNavigate();

  const validationSchema = object({
    name: string()
      .min(3, " Name must be at least 3 characters ")
      .max(25, "Name can be not more than 20 characters"),
    email: string().email("email is not valid"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      image: null,
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
        url: "http://localhost:9000/user/updateuser",
        method: "PUT",
        data: values,
        headers: {
          "Content-Type": "multipart/form-data",
          token: `7ambola ${token}`,
        },
      };
      let { data } = await axios.request(options);
      console.log(data);

      if (data.message === "created successfully") {
        toast.success("user created Successfully");
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response.data.message.message);
    } finally {
      toast.dismiss(lodingToastId);
    }
  }

  return (
    <div className="w-[96%] mt-10 ms-14 ">
      <div className=" w-full ">
        <div className="flex w-full  items-center justify-center">
          <div className="grid w-full   mx-10  grid-cols-12   shadow-sm shadow-primary-900">
            <div className=" col-span-12    py-6 px-2">
              <div className="lg:px-11 md:px-4 px-4 sm:px-10  flex items-center space-y-8 justify-center flex-col h-full">
                <form
                  className=" space-y-3 w-full gap-x-4 mb-2 text-gray-100 grid grid-cols-12 "
                  onSubmit={formik.handleSubmit}
                >
                  <h1 className="text-gray-200 col-span-12 text-xl font-semibold text-center">
                    Update Your Information
                  </h1>
                  <div className="w-[80px]  relative h-[80px] rounded-full border border-gray-500 col-span-12 overflow-hidden flex justify-center items-center mx-auto ">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className=" cursor-pointer opacity-0  top-0 bottom-0 absolute"
                    />
                    <img src={preview} alt="" />
                  </div>
                  <div className="username my-0   rounded-lg col-span-12  ">
                    <input
                      id="username"
                      type="text"
                      autoComplete="off"
                      placeholder={name}
                      className="w-full focus:outline-0 px-2 my-2 py-2  focus:!bg-transparent focus:border-1 border rounded-lg border-primary-100 placeholder:text-gray-300"
                      name="name"
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik.errors.name && formik.touched.name && (
                    <p className="text-gray-100  col-span-12 font-semibold">
                      *{formik.errors.name}
                    </p>
                  )}
                  <div className="email my-0   rounded-lg col-span-12  ">
                    <input
                      id="email"
                      type="email"
                      autoComplete="off"
                      placeholder={email}
                      className="w-full focus:outline-0 px-2 my-2 py-2  focus:!bg-transparent focus:border-1 border rounded-lg border-primary-100 placeholder:text-gray-300"
                      name="email"
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik.errors.email && formik.touched.email && (
                    <p className="text-gray-100  col-span-12 font-semibold">
                      *{formik.errors.email}
                    </p>
                  )}

                  <div className="col-span-12">
                    <button
                      type=" submit "
                      className=" w-full mt-0 bg-primary-800 text-gray-100 font-bold text-lg  hover:bg-primary-900 hover:transition hover:duration-300 duration-300 py-2 border-[.5px] border-primary-700   rounded-lg"
                    >
                      Update Information
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
