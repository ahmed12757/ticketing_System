import { createContext, useContext, useEffect } from "react";
import { UserContext } from "./User.context";
import { useState } from "react";
import axios from "axios";

export const UserInfoContext = createContext(null);
export default function UserInfoProvider({ children }) {
  const [name, setName] = useState(null);
  const [userImage, setImage] = useState(null);
  const [email, setEmail] = useState(null);
  let { token } = useContext(UserContext);
  async function getInformation() {
    try {
      const options = {
        url: "http://localhost:9000/user/profileInfo",
        method: "GET",
        headers: {
          token: `7ambola ${token}`,
        },
      };
      let { data } = await axios.request(options);

      setName(data.data.name);
      setEmail(data.data.email);
      setImage(data.data.image.secure_url);
    } catch (error) {
      console.log(error);
    }
  }

  getInformation();

  return (
    <UserInfoContext.Provider value={{ name, userImage, email }}>
      {children}
    </UserInfoContext.Provider>
  );
}
