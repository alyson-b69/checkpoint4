import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import API_URL from "../../config/config";
import Residents from "./Residents";
import Events from "./Events";
import axios from "axios";
import CreateEvent from "./CreateEvent";

const Building = ({ user }) => {
  const [building, setBuilding] = useState(null);
  const [thisEvents, setThisEvents] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const buildingUsersUri = "/user/building/";
  const token = localStorage.getItem("token");

  const getEventsUri = "/event/building/";

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

      axios
        .get(API_URL + getEventsUri + user.building_id, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            token: token,
          },
        })
        .then((response) => {
          setThisEvents(response.data);
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
            <Button variant="light" onClick={handleShow}>
              Créer une expédition
            </Button>
          </header>
          <CreateEvent user={user} show={show} handleClose={handleClose} />
          {thisEvents ? (
            thisEvents.map((ev) => {
              return <Events thisEvent={ev} user={user} />;
            })
          ) : (
            <div>Loading</div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Building;
