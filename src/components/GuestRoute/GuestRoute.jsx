import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/User.context";
import { useContext } from "react";

export default function GuestRoute({ children }) {
  let { token } = useContext(UserContext);
  if (!token) {
    return children;
  } else {
    return <Navigate to={`/home`} />;
  }
}
