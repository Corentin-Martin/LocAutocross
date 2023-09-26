import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Card, Col, Row, Spinner,
} from 'react-bootstrap';
import moment from 'moment/moment';
import './RentalComponent.scss';
import { useSelector } from 'react-redux';
import defaultKart from '../../assets/images/defaultKart.jpeg';

function RentalComponent() {
  const rental = useSelector((state) => state.dashboard.rental);

  const statusMatching = useSelector((state) => state.user.statusMatching);

  const navigate = useNavigate();

  if (rental === null) {
    return null;
  }

  return (
    <div className="col-12 col-lg-6 col-xl-8">
      <Card style={{ width: '100%', position: 'relative' }} className="mt-3 text-center bg-secondary">
        <Card.Header>
          <h2>{rental.event.title}</h2>
          <p>Date de début : {moment(rental.event.start).format('DD/MM/YYYY')}</p>
          <p>Date de fin : {moment(rental.event.start).format('DD/MM/YYYY')}</p>
          {rental.event.championship !== null
              && (
              <p>Championnat : {`${rental.event.championship.alias} `}
                - {rental.event.championship.federation.alias}
              </p>
              )}
        </Card.Header>

        <Card.Body>
          <Card.Img
            style={{ maxWidth: '70%' }}
            src={rental.vehicle.picture !== null ? `http://localhost:8000/${rental.vehicle.picture}` : defaultKart}
            alt={rental.vehicle.model}
          />
          <Card.Title className="mt-3">{`${rental.vehicle.brand.name} - `}
            <span className="badge text-black rounded" style={{ backgroundColor: statusMatching[rental.status][1] }}>
              {statusMatching[rental.status][0]}
            </span>
          </Card.Title>

          <Row className="mt-3 d-flex justify-content-between">
            <Col className="col-6">
              <Card.Subtitle>La location</Card.Subtitle>
              <div className="text-start">

                <Card.Text>Tarif : {rental.price ? `${rental.price}€` : 'Non renseigné'}</Card.Text>
                <Card.Text>Loueur : {rental.ownerUser.pseudo}</Card.Text>
                <Card.Text>Informations : {rental.description ?? 'Aucunes informations supplémentaires'}</Card.Text>
              </div>
            </Col>
            <Col className="col-6">
              <Card.Subtitle>Le véhicule</Card.Subtitle>
              <div className="text-start">

                <Card.Text>Catégorie{rental.vehicle.category.length > 1 ? 's : ' : ' : '}
                  {rental.vehicle.category.map((category, index) => (
                    (index === rental.vehicle.category.length - 1)
                      ? `${category.name}`
                      : `${category.name} / `
                  ))}
                </Card.Text>
                <Card.Text>Modèle : {rental.vehicle.model ?? 'Non renseigné'}</Card.Text>
                <Card.Text>Année : {moment(rental.vehicle.year).format('YYYY')}</Card.Text>
                <Card.Text>Moteur : {rental.vehicle.engine}</Card.Text>
                <Card.Text>Amortisseur : {rental.vehicle.shocks ?? 'Non renseigné'}</Card.Text>
                <Card.Text>Infos : {rental.vehicle.description ?? '/'}</Card.Text>
              </div>
            </Col>
          </Row>
        </Card.Body>

      </Card>
    </div>
  );
}

export default RentalComponent;
