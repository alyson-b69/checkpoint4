import React, { useState } from "react";
import { Form, Button, Col, Modal } from "react-bootstrap";
import axios from "axios";
import API_URL from "../../config/config";

const CreateEvent = ({ user, show, handleClose }) => {
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventPlaces, setEventPlaces] = useState(1);
  const [eventRecycling, setEventRecycling] = useState(7);

  const postEventUri = "/event";
  const token = localStorage.getItem("token");

  const handleEventDateChange = (e) => {
    e.preventDefault();
    setEventDate(e.target.value);
  };

  const handleEventTimeChange = (e) => {
    e.preventDefault();
    setEventTime(e.target.value);
  };

  const handleEventPlacesChange = (e) => {
    e.preventDefault();
    setEventPlaces(e.target.value);
  };

  const handleEventRecyclingChange = (e) => {
    e.preventDefault();
    setEventRecycling(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      admin_id: user.id,
      datetime: eventDate,
      building_id: user.building_id,
      nb_places: eventPlaces,
      recycling_center_id: eventRecycling,
    };

    axios
      .post(API_URL + postEventUri, data, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          token: token,
        },
      })
      .then(() => handleClose);
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Créer une expédition</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <Form.Row>
            <Form.Label column="sm" lg={3}>
              Date
            </Form.Label>
            <Col>
              <Form.Control
                size="sm"
                type="date"
                value={eventDate}
                onChange={handleEventDateChange}
                placeholder="Datetime"
                required
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column="sm" lg={3}>
              Heure
            </Form.Label>
            <Col>
              <Form.Control
                size="sm"
                type="time"
                value={eventTime}
                onChange={handleEventTimeChange}
                placeholder="Datetime"
                required
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column="sm" lg={3}>
              Déchèterie
            </Form.Label>
            <Col>
              <Form.Control
                size="sm"
                type="text"
                onChange={handleEventRecyclingChange}
                placeholder="Déchèterie"
                required
                as="select"
              >
                <option
                  value="7"
                  selected={eventRecycling === 7 ? true : false}
                >
                  Déchèterie de l'Artillerie
                </option>
              </Form.Control>
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Form.Label column="sm" lg={3}>
              Place(s) dispo(s)
            </Form.Label>
            <Col>
              <Form.Control
                size="sm"
                type="text"
                value={eventPlaces}
                onChange={handleEventPlacesChange}
                placeholder="Nombre de places"
                required
                as="select"
              >
                <option value="1" selected>
                  1
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </Form.Control>
            </Col>
          </Form.Row>
          <br />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annuler
        </Button>
        <Button type="submit" variant="darkgreen" onClick={handleSubmit}>
          Proposer une expédition
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateEvent;
