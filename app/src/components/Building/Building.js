import React from "react";
import { Card, Button } from "react-bootstrap";

const Building = () => {
  return (
    <main>
      <aside>
        <header>
          <h4>Résidents</h4>
        </header>
      </aside>
      <section>
        <header>
          <h4>Expéditions à venir</h4>
          <Button variant="light">Créer une expédition</Button>
        </header>
        <Card>
          <Card.Body>
            <Card.Title>
              André BLANC <Button variant="darkgreen">Participer</Button>
            </Card.Title>
            <Card.Subtitle className="green">26/12/2020 - 14h30</Card.Subtitle>
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
    </main>
  );
};

export default Building;
