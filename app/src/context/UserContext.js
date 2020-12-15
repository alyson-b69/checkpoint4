import React, { useEffect, useState } from "react";

export const UserContext = React.createContext(null);

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [userName, setUserName] = useState(localStorage.getItem("name"));
  const [logged, setLogged] = useState(localStorage.getItem("isLogged"));

  useEffect(() => {}, []);

  return (
    <UserContext.Provider
      value={{
        token,
        userId,
        userName,
        logged,
        setToken,
        setUserId,
        setUserName,
        setLogged,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
