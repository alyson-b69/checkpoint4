import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { UserContext } from "./context/UserContext";
import Sign from "./components/Sign";
import Header from "./components/Header";
import Building from "./components/Building/Building";
import Profil from "./components/Profil/Profil";

const App = () => {
  const { logged } = useContext(UserContext);

  console.log(logged);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          {logged ? <Building /> : <Sign />}
        </Route>
        <Route path="/mon-profil">{logged ? <Profil /> : <Sign />}</Route>
      </Switch>

      <Navbar as="footer" bg="dark" variant="dark">
        Make with ❤️ by Alyson-B
      </Navbar>
    </div>
  );
};

export default App;
