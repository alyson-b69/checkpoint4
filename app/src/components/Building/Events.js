import React from "react";
import { Card, Button } from "react-bootstrap";
import dates from "../../utils/dates";
import API_URL from "../../config/config";
import axios from "axios";

const Events = ({ thisEvent, user }) => {
  const eventDeleteUri = "/event/";
  const token = localStorage.getItem("token");

  console.log("thisEvent : ", thisEvent);

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(API_URL + eventDeleteUri + thisEvent.eventId, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      })
      .then(() => {
        alert("Event deleted");
      });
  };
  return (
    <Card key={thisEvent.id} className="expedition">
      <Card.Body>
        <Card.Title>
          {thisEvent.firstname} {thisEvent.lastname.toUpperCase()}{" "}
          <div>
            {parseInt(thisEvent.admin_id) === parseInt(user.id) ? (
              <Button variant="delete" onClick={handleDelete}>
                Supprimer
              </Button>
            ) : (
              ""
            )}
            <Button
              variant="darkgreen"
              disabled={
                thisEvent.nb_places === 0 ||
                parseInt(thisEvent.admin_id) === parseInt(user.id)
                  ? true
                  : false
              }
            >
              Participer
            </Button>
          </div>
        </Card.Title>
        <Card.Subtitle className="green">
          {dates.datify(thisEvent.datetime)}
        </Card.Subtitle>
        <Card.Subtitle className="text-muted">
          {thisEvent.adress} - {thisEvent.code_zip} {thisEvent.city}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Id {thisEvent.recycling_center_id} : Déchèterie de l'Artillerie
        </Card.Subtitle>
        <Card.Text className="participation">
          <span className={thisEvent.nb_places === 0 ? "warning" : ""}>
            {thisEvent.nb_places} place{thisEvent.nb_places > 1 ? "s" : ""}{" "}
            restante{thisEvent.nb_places > 1 ? "s" : ""}
          </span>
          <Card.Link href="#">1 participant</Card.Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Events;
