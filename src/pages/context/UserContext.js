import React, { createContext, useState } from "react";

export const USER_CONTEXT = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  const values = { setUser, user };
  return <UserContextProvider value={values}>{children}</UserContextProvider>;
};

export default UserContextProvider;
