import React, { useEffect, useState } from "react";
import { Button, Card, Form, Col } from "react-bootstrap";
import API_URL from "../../config/config";
import axios from "axios";

const BuildingCard = ({ user }) => {
  const [adressId, setAdressId] = useState("");
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


  const handleAdressChange = (e) => {
    e.preventDefault();
    setAdressId(e.target.value);
    console.log(e);
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
                      {item.adress} - {item.zip_code} - {item.city}
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
      <Card.Footer>
        Si votre immeuble n'existe pas, vous pouvez {' '}
        <Button variant="darkgreen" >
          <a href={'/creation-immeuble'}>Ajouter votre immeuble</a>
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default BuildingCard;
