import React, { useEffect, useState } from "react";
import { Card, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import dates from "../../utils/dates";
import API_URL from "../../config/config";
import axios from "axios";

const Events = ({ thisEvent, user }) => {
  const eventDeleteUri = "/event/";
  const getEventParticipantsUri = "/participe/event/";
  const token = localStorage.getItem("token");
  const [participants, setParticipants] = useState([]);

  let places_restantes = thisEvent.nb_places - participants.length;

  let foundInParticipants = false;

  for (let i = 0; i < participants.length; i++) {
    if (parseInt(participants[i].user_id) === parseInt(user.id)) {
      foundInParticipants = true;
      break;
    }
  }

  useEffect(() => {
    axios
      .get(API_URL + getEventParticipantsUri + thisEvent.eventId, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      })
      .then((response) => {
        setParticipants(response.data);
      });
  }, [thisEvent.eventId, token]);

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
        alert("L'évènement a été supprimé");
      });
  };

  const handleDeleteParticipation = (e) => {
    e.preventDefault();
    axios
      .delete(
        API_URL +
          "/participe/?user_id=" +
          user.id +
          "&event_id=" +
          thisEvent.eventId,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
          },
        }
      )
      .then(() => {
        alert("Votre participation a été annulée");
      });
  };

  const handleParticipe = (e) => {
    e.preventDefault();
    axios
      .post(
        API_URL + "/participe/",
        {
          user_id: user.id,
          event_id: thisEvent.eventId,
        },
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
          },
        }
      )
      .then(() => {
        alert("Votre participation a été prise en compte");
      });
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {participants.map((participant) => {
        return (
          <li>
            {participant.firstname} {participant.lastname.toUpperCase()}
          </li>
        );
      })}
    </Tooltip>
  );

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

            {foundInParticipants ? (
              <Button variant="delete" onClick={handleDeleteParticipation}>
                Annuler ma participation
              </Button>
            ) : (
              <Button
                variant="darkgreen"
                disabled={
                  thisEvent.nb_places === 0 ||
                  parseInt(thisEvent.admin_id) === parseInt(user.id)
                    ? true
                    : false
                }
                onClick={handleParticipe}
              >
                Participer
              </Button>
            )}
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
          <span className={places_restantes === 0 ? "warning" : ""}>
            {places_restantes} place{places_restantes > 1 ? "s" : ""} restante
            {places_restantes > 1 ? "s" : ""}
          </span>
          {participants.length ? (
            <OverlayTrigger
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <span className="participants">
                {participants.length} participant
              </span>
            </OverlayTrigger>
          ) : (
            <span className="participants">0 participant</span>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Events;
