import React, { useContext, useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { UserContext } from "./context/UserContext";
import API_URL from "./config/config";
import axios from "axios";

import Sign from "./components/Sign";
import Header from "./components/Header";
import Building from "./components/Building/Building";
import Profil from "./components/Profil/Profil";

const App = () => {
  const { logged } = useContext(UserContext);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [user, setUser] = useState(null);

  const userActuWithAdressUri = "/user/withbuilding/";

  useEffect(() => {
    if (userId) {
      axios
        .get(API_URL + userActuWithAdressUri + userId, {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
          },
        })
        .then((response) => {
          return response.data;
        })
        .then((result) => {
          result[0].id = userId;
          setUser(result[0]);
        });
    }
  }, [userId, token]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          {logged ? (
            <Building user={user} />
          ) : (
            <Sign setToken={setToken} setUserId={setUserId} />
          )}
        </Route>
        <Route path="/mon-profil">
          {logged ? (
            <Profil user={user} />
          ) : (
            <Sign setToken={setToken} setUserId={setUserId} />
          )}
        </Route>
      </Switch>

      <Navbar as="footer" bg="dark" variant="dark">
        Make with ❤️ by Alyson-B
      </Navbar>
    </div>
  );
};

export default App;
