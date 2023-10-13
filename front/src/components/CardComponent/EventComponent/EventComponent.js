import {
  Button,
  Card, Col, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setElementToDisplay } from '../../../actions/dashboard';
import TrackInfos from './TrackInfos/TrackInfos';
import InfosComponent from '../../InfosComponent/InfosComponent';
import DatesInfos from './DatesInfos/DatesInfos';
import ChampionshipInfos from './ChampionshipInfos/ChampionshipInfos';
import defaultAffiche from '../../../assets/images/defaultAffiche.jpg';
import RentalInfos from './RentalInfos/RentalInfos';
import EventControl from './EventControl/EventControl';
import CancellationBanner from '../../CancellationBanner/CancellationBanner';

function EventComponent({ event, fromCalendar, large }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => () => {
    dispatch(setElementToDisplay(null));
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [event]);

  return (
    <>
      <Card.Header style={{ position: 'relative' }}>
        {event.title !== null ? <h2>{event.title}</h2> : ''}
        {event.championship !== null
              && (
                <p>Championnat : {`${event.championship.alias} `}
                  - {event.championship.federation.alias}
                </p>
              )}
        {event.description !== null && <p>{event.description}</p>}

        {event.isCancelled && <CancellationBanner />}
      </Card.Header>

      <Card.Body>

        {fromCalendar && <Button onClick={() => navigate(`/evenement/${event.id}`)}>Voir la fiche de l'évènement</Button>}
        <Row className="mt-3 d-flex justify-content-between">
          <Col sm={12} md={6} className="mb-2" style={{ flexGrow: '1' }}>
            <Card.Img
              style={{ maxWidth: '100%' }}
              src={event.picture !== null ? `http://localhost:8000/${event.picture}` : defaultAffiche}
              alt={event.track.city}
            />
          </Col>

          <Col sm={12} md={large ? 12 : 6} className="mb-2 d-flex flex-column" style={{ flexGrow: '1' }}>
            <InfosComponent
              onClick={() => {
                navigate(`/circuit/${event.track.id}`);
              }}
              inColumn
              title="Circuit"
              childComponent={<TrackInfos track={event.track} />}
            />
            <InfosComponent inColumn title="Dates" childComponent={<DatesInfos start={event.start} end={event.end} />} />
            {event.championship !== null && (
            <InfosComponent inColumn title="Championnat" childComponent={<ChampionshipInfos championship={event.championship} />} />
            )}
          </Col>

          <InfosComponent
            title="Locations"
            childComponent={(
              <RentalInfos rentals={event.rentals.filter(
                (rental) => (rental.status > 0 && rental.status < 5),
              )}
              />
)}
          />
        </Row>

        {user !== null
        && event.associatedUser !== null
        && user.id === event.associatedUser.id
        && !fromCalendar && (
        <Row className="mt-3">
          <InfosComponent
            title="Panneau d'administration"
            bgVariant="admin"
            childComponent={<EventControl event={event} />}
          />
        </Row>
        )}

      </Card.Body>

    </>
  );
}

EventComponent.defaultProps = {
  fromCalendar: false,
  large: false,
};

export default EventComponent;
