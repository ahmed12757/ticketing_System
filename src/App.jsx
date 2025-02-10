import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./page/Signup/Signup";
import Login from "./page/Login/LogIn";
import { Toaster } from "react-hot-toast";
import Home from "./page/Home/Home";
import ForgetPassword from "./page/Forget Password/ForgetPassword";
import ResetPassword from "./page/reset password/ResetPassword";

function App() {
  const router = createBrowserRouter([
    { path: "signup", element: <Signup /> },
    { path: "login", element: <Login /> },
    { path: "home", element: <Home /> },
    { path: "forgetPassword", element: <ForgetPassword /> },
    { path: "resetPassword", element: <ResetPassword /> },
  ]);

  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
