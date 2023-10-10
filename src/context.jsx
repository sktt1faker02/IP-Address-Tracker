import React, { useEffect, useReducer } from "react";

import reducer from "./reducer";
const AppContext = React.createContext();

const userIp = "https://api.ipify.org/?format=json";

const initialState = {
  data: null,
  loading: true,
  ip: "",
  error: null,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getIP = (e) => {
    e.preventDefault();
    console.log(state.ip);
    if (state.ip) {
      fetchIPdetails(state.ip);
    } else {
      // Set an error message for invalid IP
      dispatch({ type: "ERROR", payload: "Invalid IP address" });
      console.log(state.error);
    }
  };

  const handleChangeIP = (e) => {
    dispatch({ type: "GET_IP", payload: e.target.value });
  };

  // get user IP
  const fetchUserIP = async () => {
    try {
      const response = await fetch(userIp);
      const ip = await response.json();
      // dispatch({ type: "GET_CURRENT_IP", payload: ip });
      await fetchIPdetails(ip.ip);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(state);

  const fetchIPdetails = async (ip) => {
    try {
      dispatch({ type: "LOADING", payload: true });
      const ipify = `https://geo.ipify.org/api/v2/country,city?apiKey=at_ylRbIoMSvAlhFW4tpkfRk9VXV7QnG&ipAddress=${ip}`;
      // console.log(ipify);
      const response = await fetch(ipify);
      const data = await response.json();
      dispatch({ type: "GET_IP_DETAILS", payload: data });
      dispatch({ type: "LOADING", payload: false });
    } catch (error) {
      dispatch({ type: "ERROR", payload: "Invalid IP address" });
      console.log(state.error);
      console.error(error);
    } finally {
      dispatch({ type: "LOADING", payload: false });
    }
  };

  useEffect(() => {
    fetchUserIP();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        getIP,
        handleChangeIP,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
