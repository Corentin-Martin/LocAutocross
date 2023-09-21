import { Card, Spinner } from 'react-bootstrap';
import './GarageInfos.scss';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function GarageInfos() {
  const vehicles = useSelector((state) => state.dashboard.myVehicles);
  const [isLoading, setIsLoading] = useState(true);
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (vehicles) {
      setIsLoading(false);
      setLength(vehicles.length);
    }
  }, [vehicles]);

  return (
    <div className="mt-3 text-center" style={{ flexGrow: '1' }}>

      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <Card style={{ width: '100%', height: '100%' }}>
          <Card.Title>Les informations de votre garage</Card.Title>
          <Card.Subtitle>Nombre de véhicule{length > 1 ? 's' : ''}</Card.Subtitle>
          <Card.Title>{length}</Card.Title>
        </Card>
      )}
    </div>
  );
}

export default GarageInfos;
