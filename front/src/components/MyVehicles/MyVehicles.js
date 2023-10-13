import { useEffect, useState } from 'react';
import './MyVehicles.scss';
import { Carousel } from 'react-bootstrap';
import moment from 'moment';
import { PencilSquare, ThreeDots } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import defaultKart from '../../assets/images/defaultKart.jpeg';
import {
  setElementToDisplay,
  setElementToEdit,

  setOpenCreation,
} from '../../actions/dashboard';
import DeleteButton from '../DeleteButton/DeleteButton';
import AxiosPrivate from '../../utils/AxiosPrivate';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function MyVehicles() {
  const vehicles = useSelector((state) => state.dashboard.myVehicles);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (vehicles) {
      setIsLoading(false);
    }
  }, [vehicles]);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleSeeDetails = (id) => {
    AxiosPrivate.get(`vehicles/${id}`)
      .then((response) => {
        dispatch(setElementToDisplay(response.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="d-flex flex-column align-items-center">

      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="container mt-2"
        style={{ maxWidth: '600px', maxHeight: '600px' }}
      >
        {vehicles.length === 0 && (
          <Carousel.Item className="rounded-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" fill="currentColor" className="bi bi-cone-striped img-fluid" viewBox="0 0 16 16">
              <path d="m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z" />
            </svg>
            <Carousel.Caption className="bg-tertiary rounded-4 bg-opacity-75 p-2 MyVehicles-Carousel-Caption">
              <h5>Aucun véhicule à afficher pour le moment...</h5>
            </Carousel.Caption>
          </Carousel.Item>
        )}
        {vehicles.map((vehicle) => (
          <Carousel.Item key={vehicle.id} className="rounded-4">
            <img
              src={vehicle.picture !== null ? `http://localhost:8000/${vehicle.picture}` : defaultKart}
              alt={vehicle.model}
              className="img-fluid MyVehicles-Carousel-Image"
            />
            <div className="under768 bg-tertiary bg-opacity-25">
              <div className="MyVehicles-Carousel-DeleteIcon">
                <DeleteButton type="vehicles" idToDelete={vehicle.id} />
              </div>
              <h3 className="mt-3">{vehicle.brand.name}{vehicle.model !== null ? ` - ${vehicle.model} -` : ' - '}{moment(vehicle.year).format('YYYY')}</h3>
              <p>Moteur : {vehicle.engine}</p>
              <p>Amortisseurs : {vehicle.shocks ?? 'Non renseigné'}</p>
              <PencilSquare
                size={24}
                className="text-secondary MyVehicles-Carousel-EditIcon"
                onClick={() => {
                  dispatch(setElementToEdit(vehicle));
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
                <DeleteButton type="vehicles" idToDelete={vehicle.id} />
              </div>
              <h3>{vehicle.brand.name}{vehicle.model !== null ? ` - ${vehicle.model} -` : ' - '}{moment(vehicle.year).format('YYYY')}</h3>
              <p>Moteur : {vehicle.engine}</p>
              <p>Amortisseurs : {vehicle.shocks ?? 'Non renseigné'}</p>
              <PencilSquare
                size={24}
                className="text-secondary MyVehicles-Carousel-EditIcon"
                onClick={() => {
                  dispatch(setElementToEdit(vehicle));
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

    </div>
  );
}

export default MyVehicles;
