import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment/moment';
import './Rental.scss';

function Rental() {
  const { rentalId } = useParams();
  const [rental, setRental] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const statusMatching = {
    0: ['Brouillon', '#fff'],
    1: ['Disponible', '#00FF00'],
    2: ['Interessé', '#FFFF00'],
    3: ['En cours de réservation', '#ff8000'],
    4: ['Réservation validée', '#FF0000'],
    5: ['Archivé', '#fff'],
  };

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
      {isLoading ? <p>Chargement...</p> : (
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
          <img className="Rental-Box-Image" src={rental.vehicle.picture ?? 'https://cdn-icons-png.flaticon.com/512/3272/3272412.png'} alt="vehicule" />
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
