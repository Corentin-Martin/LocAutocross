import { useEffect, useState } from 'react';
import './MyVehicles.scss';
import axios from 'axios';
import { Carousel, Spinner } from 'react-bootstrap';
import moment from 'moment';
import { PencilSquare, TrashFill, ThreeDots } from 'react-bootstrap-icons';
import defaultKart from '../../assets/images/defaultKart.jpeg';

function MyVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(
      'http://localhost:8000/api/vehicles',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
      .then((response) => {
        setVehicles(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          style={{ height: '400px', width: '600px' }}
        >
          {vehicles.map((vehicle) => (
            <Carousel.Item key={vehicle.id}>
              <img
                src={vehicle.picture !== null ? `http://localhost:8000/${vehicle.picture}` : defaultKart}
                alt={vehicle.model}
                className="rounded-4 MyVehicles-Carousel-Image"
                style={{ height: '400px', width: '600px' }}
              />
              <Carousel.Caption className="bg-tertiary rounded-4 bg-opacity-75 MyVehicles-Carousel-Caption">
                <TrashFill size={24} className="text-black MyVehicles-Carousel-DeleteIcon" />
                <h3>{vehicle.brand.name} - {vehicle.model} - {moment(vehicle.year).format('YYYY')}</h3>
                <p>Moteur : {vehicle.engine}</p>
                <p>Amortisseurs : {vehicle.shocks}</p>
                <PencilSquare size={24} className="text-secondary MyVehicles-Carousel-EditIcon" />
                <ThreeDots size={24} className="MyVehicles-Carousel-MoreIcon" />
              </Carousel.Caption>
            </Carousel.Item>
          ))}

        </Carousel>
      )}
    </div>
  );
}

export default MyVehicles;
