import React, { useState } from "react";
import { Button, Card, Form, Col } from "react-bootstrap";
import API_URL from "../../config/config";
import axios from "axios";

const CreateBuilding = ({ user }) => {
    const [zip_code, setZip_Code] = useState("");
    const [city, setCity] = useState("");
    const [adress, setAdress] = useState("");

    const token = localStorage.getItem("token");

    const handleAdressChange = (e) => {
        e.preventDefault();
        setAdress(e.target.value);
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

        axios.post(
            API_URL + "/building/",
            {
                adress: adress,
                zip_code: zip_code,
                city: city,
            },
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    token: token,
                },
            }
        ).then(()=>{
            alert('Votre immeuble a été créé')
        });
    };


    return (
        <main>
            <section>
                <header>
                    <h4>Création d'immeuble</h4>
                </header>
                <div className="profil-cards-deck">
        <Card className="building-card col-md-6">
            <Card.Title>Créer un nouvel immeuble</Card.Title>
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
                                defaultValue={adress}
                                onChange={handleAdressChange}
                                placeholder="Adresse"
                            />
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
                        Créer un nouvel immeuble
                    </Button>
                </Form.Group>
            </Card.Body>
        </Card>
                </div>
            </section>
        </main>
    );
};

export default CreateBuilding;
