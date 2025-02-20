import { createContext, useState } from "react";

export const UserContext = createContext(null);
export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  function logout() {
    setToken(null);
    localStorage.setItem("token", null);
  }
  return (
    <UserContext.Provider value={{ token, setToken, logout }}>
      {children}
    </UserContext.Provider>
  );
}
