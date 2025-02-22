import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";

export const TicketContext = createContext(null);

export default function TicketProvider({ children }) {
  const [showen, setShowen] = useState(null);
  function showTicket() {
    setShowen(true);
  }
  function hiddenTicket() {
    setShowen(false);
  }
  const [search, setSearch] = useState(false);
  async function searchTicket(name) {
    console.log(name);

    try {
      const options = {
        url: `http://localhost:9000/ticket/specific-ticket?ticketNumber=${name}`,
        method: "GET",
        headers: {
          token: `7ambola ${token}`,
        },
      };
      let { data } = await axios.request(options);

      setSearch(data.data);
      console.log(search);
    } catch (error) {
      console.log(error);
    }
  }
  searchTicket();
  let { token } = useContext(UserContext);
  const [ticket, setTicket] = useState(null);
  async function getTicket() {
    try {
      const options = {
        url: "http://localhost:9000/ticket/all/specific-ticket",
        method: "GET",
        headers: {
          token: `7ambola ${token}`,
        },
      };
      let { data } = await axios.request(options);
      setTicket(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getTicket();
  }, [token]);
  return (
    <TicketContext.Provider
      value={{
        showTicket,
        showen,
        hiddenTicket,
        getTicket,
        ticket,
        searchTicket,
        search,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}
