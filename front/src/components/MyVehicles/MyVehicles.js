import { useEffect, useState } from 'react';
import './MyVehicles.scss';
import axios from 'axios';
import { Carousel, Spinner } from 'react-bootstrap';
import moment from 'moment';
import { PencilSquare, ThreeDots } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import defaultKart from '../../assets/images/defaultKart.jpeg';
import {
  setIdToEdit,
  setMyVehicles, setOpenCreation, setVehicleForDetails,
} from '../../actions/dashboard';
import DeleteModal from '../DeleteModal/DeleteModal';

function MyVehicles() {
  const vehicles = useSelector((state) => state.dashboard.myVehicles);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(
      'http://localhost:8000/api/vehicles?my',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
      .then((response) => {
        dispatch(setMyVehicles(response.data));
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

  const handleSeeDetails = (id) => {
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
    <div className="d-flex flex-column align-items-center">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          className="container mt-2"
          style={{ maxWidth: '600px', maxHeight: '600px' }}
        >
          {vehicles.map((vehicle) => (
            <Carousel.Item key={vehicle.id} className="rounded-4">
              <img
                src={vehicle.picture !== null ? `http://localhost:8000/${vehicle.picture}` : defaultKart}
                alt={vehicle.model}
                className="img-fluid MyVehicles-Carousel-Image"
              />
              <div className="under768 bg-tertiary bg-opacity-25">
                <div className="MyVehicles-Carousel-DeleteIcon">
                  <DeleteModal type="vehicles" idToDelete={vehicle.id} />
                </div>
                <h3 className="mt-3">{vehicle.brand.name} - {vehicle.model} - {moment(vehicle.year).format('YYYY')}</h3>
                <p>Moteur : {vehicle.engine}</p>
                <p>Amortisseurs : {vehicle.shocks}</p>
                <PencilSquare
                  size={24}
                  className="text-secondary MyVehicles-Carousel-EditIcon"
                  onClick={() => {
                    dispatch(setIdToEdit(vehicle.id));
                    dispatch(setOpenCreation(true));
                  }}
                />
                <ThreeDots
                  size={24}
                  className="MyVehicles-Carousel-MoreIcon"
                  onClick={() => {
                    handleSeeDetails(vehicle.id);
                  }}
                />
              </div>

              <Carousel.Caption className="bg-tertiary rounded-4 bg-opacity-75 MyVehicles-Carousel-Caption over768">
                <div className="MyVehicles-Carousel-DeleteIcon">
                  <DeleteModal type="vehicles" idToDelete={vehicle.id} />
                </div>
                <h3>{vehicle.brand.name} - {vehicle.model} - {moment(vehicle.year).format('YYYY')}</h3>
                <p>Moteur : {vehicle.engine}</p>
                <p>Amortisseurs : {vehicle.shocks}</p>
                <PencilSquare
                  size={24}
                  className="text-secondary MyVehicles-Carousel-EditIcon"
                  onClick={() => {
                    dispatch(setIdToEdit(vehicle.id));
                    dispatch(setOpenCreation(true));
                  }}
                />
                <ThreeDots
                  size={24}
                  className="MyVehicles-Carousel-MoreIcon"
                  onClick={() => {
                    handleSeeDetails(vehicle.id);
                  }}
                />
              </Carousel.Caption>
            </Carousel.Item>
          ))}

        </Carousel>
      )}
    </div>
  );
}

export default MyVehicles;
