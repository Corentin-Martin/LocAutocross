import './Event.scss';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import RentalList from './RentalList/RentalList';
import { setModalCalendarIsOpen } from '../../actions/generalCalendar';
import AxiosPublic from '../../utils/AxiosPublic';

function Event() {
  const selectedEvent = useSelector((state) => state.generalCalendar.selectedEvent);
  const openModal = useSelector(
    (state) => state.generalCalendar.modalCalendarIsOpen,
  );

  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(setModalCalendarIsOpen(false));
  };
  const [federation, setFederation] = useState([]);

  useEffect(() => {
    if (selectedEvent.championship !== null) {
      AxiosPublic.get(`championships/${selectedEvent.championship.id}`)
        .then((response) => {
          setFederation(response.data.federation);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [selectedEvent]);

  return (
    <div>
      {openModal && (
      <div className="Event" style={{ backgroundColor: (selectedEvent.championship !== null) ? selectedEvent.championship.color : '#ffcd61' }}>
        <button type="button" onClick={closeModal} className="Event-Button">X</button>
        <h1>{selectedEvent.title}</h1>
        {selectedEvent.description !== null && <p>"{selectedEvent.description}"</p>}
        <Row>
          <Col sm={12} md={6} className="mb-3">
            <div className="Event-Box">
              <h3>Circuit</h3>
              <ul>
                <li>Nom : {selectedEvent.track.name}</li>
                <li>Ville : {selectedEvent.track.city} {`(${selectedEvent.track.postCode})`}</li>
                <li>Département : {selectedEvent.track.department}</li>
              </ul>
            </div>
          </Col>
          <Col sm={12} md={6} className="mb-3">
            <div className="Event-Box">
              <h3>Dates</h3>
              <ul>
                <li>Début : {moment(selectedEvent.start).format('DD/MM/YYYY')}</li>
                <li>Fin : {moment(selectedEvent.end).format('DD/MM/YYYY')}</li>
              </ul>
            </div>
          </Col>
          {selectedEvent.championship !== null
      && (
        <Col sm={12} className="mb-3">
          <div className="Event-Box">
            <h3>Championnat</h3>
            <ul>
              <li>Nom : {selectedEvent.championship.name} ({selectedEvent.championship.alias})</li>
              <li> Fédération : {federation.alias}</li>
            </ul>
          </div>
        </Col>
      )}
          <Col sm={12} className="mb-3">
            <div className="Event-Box">
              {selectedEvent.rentals.length > 0 ? (
                <RentalList
                  rentals={selectedEvent.rentals.filter(
                    (rental) => (rental.status > 0 && rental.status < 5),
                  )}
                />

              ) : <h3>Pas de locations proposées pour cette épreuve</h3>}
            </div>
          </Col>
        </Row>

      </div>

      )}
    </div>

  );
}

export default Event;
