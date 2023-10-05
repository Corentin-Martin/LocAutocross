import {
  Accordion, ListGroup, Spinner,
} from 'react-bootstrap';
import './MyRentals.scss';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { setRental } from '../../actions/dashboard';
import AxiosPrivate from '../../utils/AxiosPrivate';

function MyRentals() {
  const rentalDetail = useSelector((state) => state.dashboard.rental);
  const [isLoading, setIsLoading] = useState(true);
  const [myRentals, setMyRentals] = useState([]);
  const statusMatching = useSelector((state) => state.user.statusMatching);

  const dispatch = useDispatch();

  useEffect(() => {
    AxiosPrivate.get('rentals?my')
      .then((response) => {
        const past = [];
        const future = [];
        const allRentals = [];

        response.data.forEach((rental) => (
          (moment(rental.event.start) > moment())
            ? future.push(rental)
            : past.push(rental)
        ));

        allRentals.push(past);
        allRentals.push(future);

        setMyRentals(allRentals);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [rentalDetail]);

  return (
    <div className="d-flex flex-column align-items-center col-12 col-md-8 mt-3">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <div className="col-12">
          {(myRentals[0].length > 0 || myRentals[1].length > 0)
            ? (
              <Accordion defaultActiveKey="0" className="col-12">
                {myRentals.map((pastOrFuture) => (
                  (pastOrFuture.length > 0

              && (
              <Accordion.Item key={pastOrFuture[0].id} eventKey={pastOrFuture[0].id}>
                <Accordion.Header>{moment(pastOrFuture[0].event.start) < moment() ? `${pastOrFuture.length > 1 ? 'Mes ' : 'Mon '}évènement${pastOrFuture.length > 1 ? 's' : ''} passé${pastOrFuture.length > 1 ? 's' : ''}` : `${pastOrFuture.length > 1 ? 'Mes ' : 'Mon '}évènement${pastOrFuture.length > 1 ? 's' : ''} à venir`}</Accordion.Header>
                <Accordion.Body>
                  <ListGroup className="col-12">
                    {pastOrFuture.map((rent) => (
                      <ListGroup.Item key={rent.id} action className="d-flex justify-content-between bg-secondary" onClick={() => dispatch(setRental(rent))}>
                        <ul className="ms-2 me-3">
                          <li className="fw-bold">{moment(rent.event.start).format('DD/MM/YYYY')}</li>
                          <li className="fst-italic">{rent.event.track.city}</li>
                          <li>{rent.event.title}</li>
                          <li>{rent.vehicle.brand.name}{rent.vehicle.model !== null ? ` - ${rent.vehicle.model} -` : ' - '}{moment(rent.vehicle.year).format('YYYY')}</li>
                        </ul>

                        <span className="badge text-black rounded d-flex align-items-center justify-content-center" style={{ backgroundColor: statusMatching[rent.status][1], minWidth: '76px' }}>
                          {statusMatching[rent.status][0]}
                        </span>
                      </ListGroup.Item>
                    ))}

                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
              )
                  )
                ))}
              </Accordion>
            )
            : <p className="text-center">Vous n'avez encore jamais proposé de location.</p>}
        </div>
      )}
    </div>
  );
}

export default MyRentals;
