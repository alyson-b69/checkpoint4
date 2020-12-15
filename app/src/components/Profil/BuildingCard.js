import React, { useEffect, useState } from "react";
import { Button, Card, Form, Col } from "react-bootstrap";
import API_URL from "../../config/config";
import axios from "axios";

const BuildingCard = ({ user }) => {
  const [adressId, setAdressId] = useState("");
  const [zip_code, setZip_Code] = useState("");
  const [city, setCity] = useState("");
  const [allAdress, setAllAdress] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");

  useEffect(() => {
    if (user) {
      axios
        .get(API_URL + "/building", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
          },
        })
        .then((response) => {
          setAllAdress(response.data);
        });
    }
  }, [user, token]);

  useEffect(() => {
    if (user) {
      user.zip_code && setZip_Code(user.zip_code);
      user.city && setCity(user.city);
    }
  }, [user]);

  const handleAdressChange = (e) => {
    e.preventDefault();
    setAdressId(e.target.value);
    console.log(e);
  };

  const handleZipChange = (e) => {
    e.preventDefault();
    setZip_Code(e.target.value);
  };

  const handleCityChange = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(
      API_URL + "/user/" + userId,
      {
        building_id: adressId,
      },
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      }
    );
  };

  if (!user) {
    return <div>Loading</div>;
  }
  return (
    <Card className="building-card col-md-6">
      <Card.Title>Mon immeuble</Card.Title>
      <Card.Body>
        <Form.Group>
          <Form.Row>
            <Form.Label column="sm" lg={3}>
              Adresse
            </Form.Label>
            <Col>
              <Form.Control
                size="sm"
                type="text"
                defaultValue={user.adress}
                onChange={handleAdressChange}
                placeholder="Adresse"
                as="select"
              >
                {user &&
                  allAdress.map((item) => (
                    <option
                      key={item.adress}
                      value={item.id}
                      selected={item.adress === user.adress ? true : false}
                    >
                      {item.adress}
                    </option>
                  ))}
                <option
                  value={null}
                  selected={user && user.adress ? false : true}
                ></option>
              </Form.Control>
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column="sm" lg={3}>
              Code postal
            </Form.Label>
            <Col>
              <Form.Control
                size="sm"
                type="text"
                value={zip_code}
                onChange={handleZipChange}
                placeholder="Code postal"
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column="sm" lg={3}>
              Ville
            </Form.Label>
            <Col>
              <Form.Control
                size="sm"
                type="text"
                value={city}
                onChange={handleCityChange}
                placeholder="Ville"
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
            Mettre à jour mon immeuble
          </Button>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default BuildingCard;
