import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState(() => {
    // Initialize state from localStorage or default
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  });

  const contextValue = {
    userEmail,
    setUserEmail,
    loggedIn,
    setLoggedIn,
    password,
    setPassword,
    users,
    setUsers,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContext;
