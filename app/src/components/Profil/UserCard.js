import React, { useState, useEffect } from "react";
import { Button, Card, Form, Col } from "react-bootstrap";
import API_URL from "../../config/config";
import axios from "axios";

const UserCard = ({ user }) => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const putUserUri = "/user/";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setEmail(user.email);
    }
  }, [user]);

  const handleUsernameChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handleFirstnameChange = (e) => {
    e.preventDefault();
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e) => {
    e.preventDefault();
    setLastname(e.target.value);
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");

    axios
      .put(
        API_URL + putUserUri + user.id,
        {
          username: username,
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          building_id: user.building_id,
        },
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
          },
        }
      )
      .then((response) => {
        console.log(response);
      });

    // fetch(API_URL + putUserUri + user.id, {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     token: token,
    //   },
    //   body: JSON.stringify({
    //     username: username,
    //     firstname: firstname,
    //     lastname: lastname,
    //     email: email,
    //     password: password,
    //     building_id: user.building_id,
    //   }),
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((result) => console.log(result));
  };

  return (
    <Card className="profil-card col-md-4">
      <Card.Title>Mes informations personnelles</Card.Title>
      <Card.Body>
        <Form.Group>
          <Form.Row>
            <Form.Label column="sm" lg={3}>
              Pseudo
            </Form.Label>
            <Col>
              <Form.Control
                size="sm"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Pseudo"
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column="sm" lg={3}>
              Prénom
            </Form.Label>
            <Col>
              <Form.Control
                size="sm"
                type="text"
                value={firstname}
                onChange={handleFirstnameChange}
                placeholder="Prénom"
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column="sm" lg={3}>
              Nom
            </Form.Label>
            <Col>
              <Form.Control
                size="sm"
                type="text"
                value={lastname}
                onChange={handleLastnameChange}
                placeholder="Nom"
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column="sm" lg={3}>
              Email
            </Form.Label>
            <Col>
              <Form.Control
                size="sm"
                type="email"
                placeholder="Email"
                onChange={handleEmailChange}
                value={email}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column="sm" lg={3}>
              Mot de passe
            </Form.Label>
            <Col>
              <Form.Control
                size="sm"
                type="password"
                placeholder="Mot de passe"
                onChange={handlePasswordChange}
                value={password}
              />
            </Col>
          </Form.Row>
          <br />

          <Button
            type="submit"
            variant="darkgreen"
            className="w-100"
            onClick={handleSubmit}
          >
            Mettre à jour mon profil
          </Button>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
