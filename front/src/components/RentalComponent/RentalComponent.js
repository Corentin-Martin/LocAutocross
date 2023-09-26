import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import moment from 'moment/moment';
import './RentalComponent.scss';
import { useSelector } from 'react-redux';
import defaultKart from '../../assets/images/defaultKart.jpeg';

function Rental() {
  const { rentalId } = useParams();
  const [rental, setRental] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const statusMatching = useSelector((state) => state.user.statusMatching);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/rentals/${rentalId}`)
      .then((response) => {
        setRental(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="Rental">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <div className="Rental-Box">
          <div onClick={() => (navigate('/'))} className="Rental-Box-Event">
            <h2>{rental.event.title}</h2>
            <p>Date de début : {moment(rental.event.start).format('DD/MM/YYYY')}</p>
            <p>Date de fin : {moment(rental.event.start).format('DD/MM/YYYY')}</p>
            {rental.event.championship !== null
              && (
              <p>Championnat : {`${rental.event.championship.alias} `}
                - {rental.event.championship.federation.alias}
              </p>
              )}
          </div>
          <h2 className="Rental-Box-Title">{`${rental.vehicle.brand.name} - `}
            <span style={{ backgroundColor: statusMatching[rental.status][1] }}>
              {statusMatching[rental.status][0]}
            </span>
          </h2>
          <img className="Rental-Box-Image" src={rental.vehicle.picture ?? defaultKart} alt="vehicule" />
          <div className="Rental-Box-Infos">
            <div className="Rental-Box-Infos-Element">
              <h3 className="Rental-Box-Infos-Element-Title">La location</h3>
              <div className="Rental-Box-Infos-Element-Sub">

                <p>Tarif : {rental.price ? `${rental.price}€` : 'Non renseigné'}</p>
                <p>Loueur : {rental.ownerUser.pseudo}</p>
                <p>{rental.description ?? 'Aucunes informations supplémentaires'}</p>
              </div>
            </div>
            <div className="Rental-Box-Infos-Element">
              <h3 className="Rental-Box-Infos-Element-Title">Le véhicule</h3>
              <div className="Rental-Box-Infos-Element-Sub">
                <p> Catégorie{rental.vehicle.category.length > 1 ? 's : ' : ' : '}
                  {rental.vehicle.category.map((category, index) => (
                    (index === rental.vehicle.category.length - 1)
                      ? `${category.name}`
                      : `${category.name} / `
                  ))}
                </p>
                <p>Modèle : {rental.vehicle.model ?? 'Non renseigné'}</p>
                <p>Année : {moment(rental.vehicle.year).format('YYYY')}</p>
                <p>Moteur : {rental.vehicle.engine}</p>
                <p>Amortisseur : {rental.vehicle.shocks ?? 'Non renseigné'}</p>
                <p>Infos : {rental.vehicle.description ?? '/'}</p>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default Rental;
