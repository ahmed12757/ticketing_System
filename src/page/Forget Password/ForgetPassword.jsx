import { useFormik } from "formik";
import background from "../../images/background.png";
import { object, ref, string } from "yup";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import axios from "axios";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const validationSchema = object({
    email: string().required("email is required").email("email is not valid"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
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
        url: "http://localhost:9000/auth/forgetPassword",
        method: "POST",
        data: values,
      };
      let { data } = await axios.request(options);
      console.log(data.message);

      if (data.message === "dto sended successfully") {
        toast.success("sended successfully");
        setTimeout(() => {
          navigate("/resetPassword");
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
          <title> forget password </title>
        </Helmet>
        <div className="flex  h-screen items-center justify-center">
          <div className="grid  w-[100%] mx-10  grid-cols-12   shadow-md shadow-primary-900">
            <div className=" col-span-12 bg-primary-700  md:col-span-7 py-6 px-2">
              <div className="lg:px-11 md:px-4 px-4 sm:px-10  flex items-center space-y-8 justify-center flex-col h-full">
                <form
                  action=""
                  className=" space-y-3 w-full gap-x-4 mb-2 text-gray-100 grid grid-cols-12 "
                  onSubmit={formik.handleSubmit}
                >
                  <h1 className="text-gray-200 col-span-12 uppercase text-xl font-semibold text-center">
                    Forgot Your Password?{" "}
                  </h1>
                  <p className="text-gray-300 col-span-12  text-sm font-normal text-center">
                    Just enter your email address below and we'll send you a
                    link via email to reset your password!
                  </p>
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

                  <button
                    type=" submit "
                    className="col-span-12 my-3 bg-primary-800 text-gray-100 font-bold text-lg  hover:bg-primary-900 hover:transition hover:duration-300 duration-300 py-2 border-[.5px] border-primary-700  w-full rounded-lg"
                  >
                    Send Reset Instruction
                  </button>
                </form>
                <p className="text-gray-200 text-sm  font-normal ">
                  Remembered password?{" "}
                  <span className="text-blue-500 ">
                    {"  "}
                    <Link to={`/login`}>
                      Login <i class="fa-solid fa-angle-right"></i>
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
