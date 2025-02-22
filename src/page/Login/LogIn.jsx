import { useFormik } from "formik";
import background from "../../images/background.png";
import UserProfileImage from "../../images/UserProfileImage.png";
import { useContext, useState } from "react";
import { object, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import axios from "axios";
import { UserContext } from "../../context/User.context";

export default function Login() {
  let { setToken } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const validationSchema = object({
    email: string().required("email is required").email("email is not valid"),
    password: string()
      .required("password is required")
      .matches(
        passwordRegex,
        "password | Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
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
        url: "http://localhost:9000/auth/signin",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      console.log(data.token);

      if (data.message === "Signing in successfully") {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        toast.success("user created Successfully");
        setTimeout(() => {
          navigate("/home");
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
          <title> Log In </title>
        </Helmet>
        <div className="flex  h-screen items-center justify-center">
          <div className="grid  w-[100%] mx-10  grid-cols-12   shadow-md shadow-primary-900">
            <div className=" col-span-12 bg-gray-200  md:col-span-7 py-6 px-2">
              <div className="lg:px-11 md:px-4 px-4 sm:px-10  flex items-center space-y-8 justify-center flex-col h-full">
                <form
                  action=""
                  className=" space-y-3 w-full gap-x-4 mb-2 text-primary-400 grid grid-cols-12 "
                  onSubmit={formik.handleSubmit}
                >
                  <h1 className="text-primary-500 col-span-12 uppercase text-xl font-semibold text-center">
                    welcome back{" "}
                    <span className="">
                      <i class="fa-regular fa-circle-user"></i>
                    </span>
                  </h1>
                  <div className="email my-0   rounded-lg col-span-12  ">
                    <input
                      id="email"
                      type="email"
                      autoComplete="off"
                      placeholder="Enter your email"
                      className="w-full focus:outline-0 px-2 my-2 py-2  focus:!bg-transparent focus:border-1 border rounded-lg border-primary-100 placeholder:text-primary-300"
                      name="email"
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                  </div>
                  {formik.errors.email && formik.touched.email && (
                    <p className="text-primary-400  col-span-12 font-semibold">
                      *{formik.errors.email}
                    </p>
                  )}
                  <div className="password  relative my-3  rounded-lg col-span-12">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="off"
                      placeholder="password"
                      className="w-full focus:outline-0 px-2 my-2 py-2  focus:!bg-transparent focus:border-1 border rounded-lg border-primary-100 placeholder:text-primary-300"
                      name="password"
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />

                    <i
                      onClick={togglePasswordVisibility}
                      className={
                        showPassword
                          ? `fa-solid text-primary-300 fa-eye absolute  top-[50%]  right-[10px] -translate-y-[50%] cursor-pointer font-normal text-[13px]`
                          : `fa-solid text-primary-300 fa-eye-slash absolute  top-[50%]  right-[10px] -translate-y-[50%] cursor-pointer font-normal text-[13px] `
                      }
                    ></i>
                  </div>

                  {formik.errors.password && formik.touched.password && (
                    <p className="text-primary-300 col-span-12 w-full font-semibold">
                      *{formik.errors.password}
                    </p>
                  )}
                  <button
                    type=" submit "
                    className="col-span-12 mt-0 bg-primary-800 text-gray-100 font-bold text-lg  hover:bg-primary-900 hover:transition hover:duration-300 duration-300 py-2 border-[.5px] border-primary-700  w-full rounded-lg"
                  >
                    Login
                  </button>
                </form>
                <p className="text-blue-500 text-sm  font-normal my-3">
                  <Link to={`/forgetPassword`}>Forgot Password?</Link>{" "}
                </p>
                <p className="text-primary-400 text-sm  font-normal ">
                  Not a member yet?{" "}
                  <span className="text-blue-500 ">
                    {"  "}
                    <Link to={`/signup`}>
                      Signup <i class="fa-solid fa-angle-right"></i>
                    </Link>{" "}
                  </span>
                </p>
              </div>
            </div>
            <div className=" hidden bg-gray-100   md:block px-2  col-span-5 ">
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
