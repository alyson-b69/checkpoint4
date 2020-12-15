import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import API_URL from "../../config/config";
import Residents from "./Residents";

const Building = ({ user }) => {
  const [building, setBuilding] = useState(null);

  const buildingUsersUri = "/user/building/";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (user) {
      fetch(API_URL + buildingUsersUri + user.building_id, {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setBuilding({ residents: result });
        });
    }
  }, [user, token]);

  return (
    <main className="building-main">
      <h3>
        {user
          ? " " +
            user.adress +
            " - " +
            user.zip_code +
            " " +
            user.city.toUpperCase()
          : ""}
      </h3>
      <div className="wrapper">
        <Residents building={building} />
        <section>
          <header>
            <h4>Expéditions à venir</h4>
            <Button variant="light">Créer une expédition</Button>
          </header>
          <Card className="expedition">
            <Card.Body>
              <Card.Title>
                André BLANC <Button variant="darkgreen">Participer</Button>
              </Card.Title>
              <Card.Subtitle className="green">
                26/12/2020 - 14h30
              </Card.Subtitle>
              <Card.Subtitle className="text-muted">
                2 rue des Bons enfants 69007 LYON
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">
                Déchèterie de l'Artillerie
              </Card.Subtitle>
              <Card.Text className="participation">
                <span>2 places restantes</span>
                <Card.Link href="#">1 participant</Card.Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default Building;
