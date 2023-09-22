import { Card, Spinner } from 'react-bootstrap';
import './GarageInfos.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { EyeFill } from 'react-bootstrap-icons';
import { setVehicleForDetails } from '../../actions/dashboard';

function GarageInfos() {
  const vehicles = useSelector((state) => state.dashboard.myVehicles);
  const [isLoading, setIsLoading] = useState(true);
  const [length, setLength] = useState(0);
  const [oldestVehicle, setOldestVehicle] = useState(null);
  const [newestVehicle, setNewestVehicle] = useState(null);
  const [recentlyUpdatedVehicle, setRecentlyUpdatedVehicle] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (vehicles) {
      setLength(vehicles.length);

      const vehiclesByCreatedAt = vehicles.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
      });

      const vehiclesByUpdatedAt = vehicles
        .filter((vehicle) => vehicle.updatedAt !== null)
        .sort((a, b) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateA - dateB;
        });

      setOldestVehicle(vehiclesByCreatedAt[0]);
      setNewestVehicle(vehiclesByCreatedAt[vehiclesByCreatedAt.length - 1]);
      setRecentlyUpdatedVehicle(vehiclesByUpdatedAt[0]);
      setIsLoading(false);
    }
  }, [vehicles]);

  const handleShowVehicle = (id) => {
    axios.get(
      `http://localhost:8000/api/vehicles/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
      .then((response) => {
        dispatch(setVehicleForDetails(response.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="mt-3 text-center" style={{ flexGrow: '1' }}>

      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <Card style={{ width: '100%', height: '100%' }} className="d-flex justify-content-center align-items-center">
          <Card.Title>Les informations de votre garage</Card.Title>
          {length > 0 ? (
            <>
              <Card.Subtitle className="mt-2">Nombre de véhicule{length > 1 ? 's' : ''}</Card.Subtitle>
              <Card.Text>{length}</Card.Text>
              <Card.Subtitle>Premier ajout de véhicule</Card.Subtitle>
              <Card.Text>{oldestVehicle ? (
                <>
                  {moment(oldestVehicle.createdAt).format('DD/MM/YYYY HH:mm')} <EyeFill
                    size={24}
                    style={{ cursor: 'pointer' }}
                    className="ms-2 text-tertiary"
                    onClick={() => {
                      handleShowVehicle(oldestVehicle.id);
                    }}
                  />
                </>
              )
                : ''}
              </Card.Text>
              <Card.Subtitle>Dernier ajout de véhicule</Card.Subtitle>
              <Card.Text>{newestVehicle ? (
                <>
                  {moment(newestVehicle.createdAt).format('DD/MM/YYYY HH:mm')} <EyeFill
                    size={24}
                    style={{ cursor: 'pointer' }}
                    className="ms-2 text-tertiary"
                    onClick={() => {
                      handleShowVehicle(newestVehicle.id);
                    }}
                  />
                </>
              ) : ''}
              </Card.Text>
              <Card.Subtitle>Dernière modification de véhicule</Card.Subtitle>
              <Card.Text>{recentlyUpdatedVehicle ? (
                <>
                  {moment(recentlyUpdatedVehicle.updatedAt).format('DD/MM/YYYY HH:mm')} <EyeFill
                    size={24}
                    style={{ cursor: 'pointer' }}
                    className="ms-2 text-tertiary"
                    onClick={() => {
                      handleShowVehicle(recentlyUpdatedVehicle.id);
                    }}
                  />
                </>
              ) : '/'}
              </Card.Text>
            </>
          ) : <Card.Subtitle className="mt-3">Votre garage est vide.</Card.Subtitle>}

        </Card>
      )}
    </div>
  );
}

export default GarageInfos;
