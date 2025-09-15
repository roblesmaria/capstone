import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [firstName, setFirstName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState(() => {
    // Initialize state from localStorage or default
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  });

  const contextValue = {
    firstName,
    setFirstName,
    userEmail,
    setUserEmail,
    loggedIn,
    setLoggedIn,
    password,
    setPassword,
    events,
    setEvents,
    users,
    setUsers,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContext;
