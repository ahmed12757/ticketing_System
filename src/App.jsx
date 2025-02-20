import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./page/Signup/Signup";
import Login from "./page/Login/LogIn";
import { Toaster } from "react-hot-toast";
import Home from "./page/Home/Home";
import ForgetPassword from "./page/Forget Password/ForgetPassword";
import ResetPassword from "./page/reset password/ResetPassword";
import Layout from "./components/Layout/Layout";
import Loader from "./components/Loding/Loding";
import ProtectedRout from "./components/ProtectedRout/ProtectedRout";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import Logout from "./components/Logout/Logout";
import UserProvider from "./context/User.context";
import Setting from "./page/Setting/Setting";
import UserInfoProvider from "./context/userInfo.context";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRout>
          <Layout />
        </ProtectedRout>
      ),
      children: [
        { path: "loader", element: <Loader /> },
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "setting", element: <Setting /> },
      ],
    },
    {
      path: "/",
      element: (
        <GuestRoute>
          <Logout />
        </GuestRoute>
      ),
      children: [
        { index: true, element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        { path: "forgetPassword", element: <ForgetPassword /> },
        { path: "resetPassword", element: <ResetPassword /> },
      ],
    },
  ]);

  return (
    <>
      <UserProvider>
        <UserInfoProvider>
          <RouterProvider router={router} />
        </UserInfoProvider>
      </UserProvider>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
