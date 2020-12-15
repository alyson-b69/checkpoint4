import React, { useContext } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext";

const Header = () => {
  const { logged, setLogged } = useContext(UserContext);

  console.log(window.location.pathname);

  const resetLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("name");
    localStorage.removeItem("isLogged");
    setLogged(false);
  };

  const logout = () => {
    resetLocalStorage();
  };

  return (
    <Navbar as="header" bg="dark" variant="dark">
      <Navbar.Brand href="/">CO-DECHETERIE</Navbar.Brand>
      {logged && (
        <>
          <Nav className="mr-auto">
            <Nav.Link
              href="/"
              className={window.location.pathname === "/" && "active"}
            >
              Mon immeuble
            </Nav.Link>
            <Nav.Link
              href="/mon-profil"
              className={window.location.pathname === "/mon-profil" && "active"}
            >
              Mon profil
            </Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={logout}>
            Deconnexion
          </Button>
        </>
      )}
    </Navbar>
  );
};

export default Header;
