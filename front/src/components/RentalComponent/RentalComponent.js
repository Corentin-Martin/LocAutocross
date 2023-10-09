import {
  Button,
  Card, Col, Row,
} from 'react-bootstrap';
import moment from 'moment/moment';
import './RentalComponent.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import defaultKart from '../../assets/images/defaultKart.jpeg';
import RentalControl from './RentalControl/RentalControl';
import RentalUserbox from './RentalUserbox/RentalUserbox';

function RentalComponent() {
  const rental = useSelector((state) => state.dashboard.rental);
  const user = useSelector((state) => state.user.user);

  const statusMatching = useSelector((state) => state.user.statusMatching);

  const navigate = useNavigate();

  return (
    <>
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
          <Col sm={12} md={6} className="mb-2" style={{ flexGrow: '1' }}>
            <Card style={{ width: '100%', height: '100%' }}>
              <Card.Header>La location</Card.Header>
              <Card.Body className="text-start">

                <Card.Text>Tarif : {rental.price ? `${rental.price}€` : 'Non renseigné'}</Card.Text>
                <Card.Text>Loueur : {rental.ownerUser.pseudo}</Card.Text>
                <Card.Text>Informations : {rental.description ?? 'Aucunes informations supplémentaires'}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} md={6} className="mb-2">
            <Card>
              <Card.Header>Le véhicule</Card.Header>
              <Card.Body className="text-start">

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
              </Card.Body>
            </Card>
          </Col>

          <RentalControl rental={rental} />
          <RentalUserbox rental={rental} />
          {(user === null && rental.status < 4)
              && (
              <Button
                type="button"
                className="col-12 text-light"
                variant="danger"
                onClick={() => {
                  navigate('/connexion', { state: { rental: rental } });
                }}
              >Pour plus de renseignements ou pour réserver, veuillez vous connecter
              </Button>
              )}
        </Row>
      </Card.Body>

    </>
  );
}

export default RentalComponent;
