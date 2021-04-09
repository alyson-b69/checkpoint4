import React, { useContext, useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import API_URL from "./config/config";
import axios from "axios";

import Sign from "./Pages/Sign/Sign";
import Header from "./components/Header/Header";
import Building from "./Pages/Building/Building";
import Profil from "./Pages/Profil/Profil";
import NotFound from "./Pages/NotFound/NotFound"
import CreateBuilding from "./Pages/CreateBuilding/CreateBuilding";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Footer from "./components/Footer/Footer";

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
          <Route exact path="/login" component={()=> <Sign setToken={setToken} setUserId={setUserId}/>} />
          <PrivateRoute exact path="/" component={()=> <Building user={user}/>} logged={logged} />
          <PrivateRoute path="/mon-profil" component={()=> <Profil user={user}/>} logged={logged} />
          <PrivateRoute path="/creation-immeuble" component={()=> <CreateBuilding user={user}/>} logged={logged} />
          <PrivateRoute path="/*" component={()=> <NotFound />} logged={logged} />
      </Switch>

    <Footer />
    </div>
  );
};

export default App;
