import axios from "axios";
import React, { useContext } from "react";
import { UserContext } from "../../context/User.context";
import { TicketContext } from "../../context/Ticket.comntext";
import { useFormik } from "formik";
import { object, string } from "yup";
import toast from "react-hot-toast";

export default function AddTicket() {
  let { token } = useContext(UserContext);
  let { hiddenTicket, getTicket } = useContext(TicketContext);
  const validationSchema = object({
    title: string()
      .required("name is required")
      .min(3, " Name must be at least 3 characters ")
      .max(25, "Name can be not more than 20 characters"),
    description: string()
      .required("description is required")
      .min(10, " description must be at least 10 characters ")
      .max(100, "description can be not more than 100 characters"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: function (values, { resetForm }) {
      addTicket(values);

      resetForm();
    },
    validationSchema,
  });
  async function addTicket(values) {
    const lodingToastId = toast.loading("waiting...");
    try {
      const options = {
        url: "http://localhost:9000/ticket/add",
        method: "POST",
        data: values,
        headers: {
          token: `7ambola ${token}`,
        },
      };
      let { data } = await axios.request(options);
      if (data.message === "Ticket added successfully") {
        toast.success("Ticket added successfully");
        getTicket();
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(lodingToastId);
    }
  }
  return (
    <>
      <div className="justify-center items-center flex h-screen  ">
        <div className="bg-gray-200 w-[80%] min-h-[80%] rounded-xl mt-10 ms-14">
          <div className=" relative ">
            <i
              onClick={hiddenTicket}
              class="fa-solid fa-circle-xmark absolute top-[15px] right-[15px] text-3xl font-semibold text-red-500 hover:text-red-600 "
            ></i>
          </div>
          <div className="flex items-center justify-center flex-col py-7  px-6 md:px-10 lg:px-14">
            <div className="text-center text-2xl font-bold mt-10 text-primary-500">
              Create Ticket Component
            </div>
            <form
              action=""
              className="w-full space-y-8 mt-5"
              onSubmit={formik.handleSubmit}
            >
              <div className="title">
                <label
                  htmlFor="title"
                  className="text-2xl font-semibold text-primary-300"
                >
                  {" "}
                  Ticket Title{" "}
                </label>
                <input
                  id="title"
                  placeholder="Enter your ticket title"
                  className="w-full focus:outline-0 px-2 my-2 py-2  focus:!bg-transparent focus:border-b-1 border-b  border-primary-100 placeholder:text-primary-300"
                  type="text"
                  name="title"
                  value={formik.values.title}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.errors.title && formik.touched.title && (
                  <p className="text-primary-400  col-span-12 font-semibold">
                    *{formik.errors.title}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="text-2xl font-semibold text-primary-300"
                >
                  {" "}
                  Ticket Description{" "}
                </label>
                <textarea
                  id="description"
                  rows={8}
                  placeholder="Enter your ticket description"
                  className="w-full focus:outline-0 px-2 my-2 py-2  focus:!bg-transparent focus:border-1 border rounded-lg border-primary-100 placeholder:text-primary-300"
                  type="text"
                  name="description"
                  value={formik.values.description}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.errors.description && formik.touched.description && (
                  <p className="text-primary-400  col-span-12 font-semibold">
                    *{formik.errors.description}
                  </p>
                )}
              </div>
              <button
                type=" submit "
                className=" mt-0 bg-primary-800 text-gray-100 font-bold text-lg  hover:bg-primary-900 hover:transition hover:duration-300 duration-300 py-2 border-[.5px] border-primary-700  w-full rounded-lg"
              >
                Send Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
