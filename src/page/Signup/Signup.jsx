import { useFormik } from "formik";
import background from "../../images/background.png";
import UserProfileImage from "../../images/UserProfileImage.png";
import { useState } from "react";
import { date, object, ref, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import axios from "axios";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [preview, setPreview] = useState(UserProfileImage);
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

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const validationSchema = object({
    name: string()
      .required("name is required")
      .min(3, " Name must be at least 3 characters ")
      .max(25, "Name can be not more than 20 characters"),
    email: string().required("email is required").email("email is not valid"),
    password: string()
      .required("password is required")
      .matches(
        passwordRegex,
        "password | Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
    confirmPassword: string()
      .required(" confirm is required")
      .oneOf(
        [ref("password")],
        " password & confirm Password should be the same "
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
        url: "http://localhost:9000/auth/signup",
        method: "POST",
        data: values,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      let { data } = await axios.request(options);
      console.log(data);

      if (data.message === "created successfully") {
        toast.success("user created Successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message.message);
    } finally {
      toast.dismiss(lodingToastId);
    }
  }

  return (
    <div className="w-full bg-primary-500 h-screen">
      <div className=" container mx-auto ">
        <Helmet>
          <title> SignUp </title>
        </Helmet>
        <div className="flex  h-screen items-center justify-center">
          <div className="grid  w-[100%] mx-10  grid-cols-12   shadow-md shadow-primary-900">
            <div className=" col-span-12 bg-primary-700  md:col-span-7 py-6 px-2">
              <div className="lg:px-11 md:px-4 px-4 sm:px-10  flex items-center space-y-8 justify-center flex-col h-full">
                <form
                  className=" space-y-3 w-full gap-x-4 mb-2 text-gray-100 grid grid-cols-12 "
                  onSubmit={formik.handleSubmit}
                >
                  <h1 className="text-gray-200 col-span-12 text-xl font-semibold text-center">
                    Create Account!{" "}
                    <span className="">
                      <i class="fa-regular fa-circle-user"></i>
                    </span>
                  </h1>
                  <div className="w-[80px]  relative h-[80px] rounded-full border border-primary-500 col-span-12 overflow-hidden flex justify-center items-center mx-auto ">
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
                      placeholder="Enter your name"
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
                      placeholder="Enter your email"
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

                  <div className="password my-0 relative   rounded-lg col-span-6">
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
                  <div className="re-password my-0 relative  rounded-lg col-span-6 ">
                    <input
                      id="ConfirmPassword"
                      placeholder="Confirm Password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="off"
                      className="w-full focus:outline-0 px-2 my-2 py-2 focus:!bg-transparent focus:border-1 border rounded-lg border-primary-100 placeholder:text-gray-300"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
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
                  <div className=" col-span-6">
                    {formik.errors.password && formik.touched.password && (
                      <p className="text-gray-100 w-full font-semibold">
                        *{formik.errors.password}
                      </p>
                    )}
                  </div>
                  {formik.errors.confirmPassword &&
                    formik.touched.confirmPassword && (
                      <p className="text-gray-100 col-span-6 font-semibold">
                        *{formik.errors.confirmPassword}
                      </p>
                    )}
                  <button
                    type=" submit "
                    className="col-span-12 mt-0 bg-primary-800 text-gray-100 font-bold text-lg  hover:bg-primary-900 hover:transition hover:duration-300 duration-300 py-2 border-[.5px] border-primary-700  w-full rounded-lg"
                  >
                    Signup
                  </button>
                </form>
                <p className="text-gray-200 text-sm  font-normal ">
                  Already a member?{" "}
                  <span className="text-blue-500 ">
                    {"  "}
                    <Link to={`/login`}>
                      Log In <i class="fa-solid fa-angle-right"></i>
                    </Link>{" "}
                  </span>
                </p>
              </div>
            </div>
            <div className=" hidden bg-primary-600   md:block px-2  col-span-5 ">
              <img
                src={background}
                alt=""
                className="w-full h-full object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
