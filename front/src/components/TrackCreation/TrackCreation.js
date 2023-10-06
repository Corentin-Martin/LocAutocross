import { useState } from 'react';
import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setNewTrack, setOpenTrackCreation } from '../../actions/dashboard';
import AxiosPrivate from '../../utils/AxiosPrivate';

function TrackCreation() {
  const [suggestions, setSuggestions] = useState([]);
  const [lastSearchTerm, setLastSearchTerm] = useState('');

  const [city, setCity] = useState(null);
  const [name, setName] = useState('');
  const [wrong, setWrong] = useState(false);

  const dispatch = useDispatch();

  const handleCitySearch = (event) => {
    if (event.currentTarget.value.match(/\//g) && event.currentTarget.value.match(/\//g).length === 2) {
      setCity(event.currentTarget.value);
    }
    else if (
      event.currentTarget.value.length >= 4 && event.currentTarget.value !== lastSearchTerm) {
      setLastSearchTerm(event.currentTarget.value);

      const apiUrl = `http://api.geonames.org/postalCodeSearchJSON?placename_startsWith=${event.currentTarget.value}&country=FR&username=locautocross`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const filteredResults = data.postalCodes.filter((cityFiltered) => {
            const cityPostalCode = cityFiltered.postalCode.toLowerCase();
            const cityName = cityFiltered.placeName.toLowerCase();
            return !cityPostalCode.includes('cedex') && !cityName.includes('cedex');
          });
          setSuggestions(filteredResults);
        })
        .catch((error) => {
          console.error('Erreur lors de la requête à Geonames :', error);
        });
    }
    else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (city !== null) {
      const splitCity = city.split(' / ');

      const cityObject = suggestions.filter(
        (sugges) => sugges.placeName === splitCity[0]
        && sugges.postalCode === splitCity[1]
        && sugges.adminName2 === splitCity[2],
      );

      if (cityObject.length === 1) {
        AxiosPrivate.post('tracks', {
          name: name,
          city: cityObject[0].placeName,
          department: cityObject[0].adminName2,
          postCode: parseInt(cityObject[0].postalCode, 10),
          latitude: cityObject[0].lat,
          longitude: cityObject[0].lng,
        }).then((response) => {
          dispatch(setOpenTrackCreation(false));
          dispatch(setNewTrack(response.data));
        })
          .catch((error) => {
            console.error(error);
          });
      }
    }
    else {
      setWrong(true);
    }
  };

  return (
    <Modal show onHide={() => dispatch(setOpenTrackCreation(false))}>
      <Modal.Header closeButton>
        <Modal.Title>Nouveau circuit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="brandSelect" className="mb-3 col-10">
            <Form.Label>Ville *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Sélectionnez une ville"
              list="citiesList"
              onChange={handleCitySearch}
            />
            <datalist id="citiesList">
              {suggestions.map((oneCity) => (
                <option key={oneCity.postalCode + Math.random()} value={`${oneCity.placeName} / ${oneCity.postalCode} / ${oneCity.adminName2}`} />
              ))}
            </datalist>
          </Form.Group>

          <FloatingLabel
            controlId="floatingInput"
            label="Nom du circuit"
            className="mb-3 col-10"
          >
            <Form.Control
              onChange={(event) => {
                setName(event.currentTarget.value);
              }}
              type="text"
              placeholder="Nom du circuit"
              value={name}
            />
          </FloatingLabel>

          {wrong
          && (
          <div className="text-danger mt-2 text-center">
            Le format de la ville n'est pas correct. Vous
            devez la sélectionner depuis la liste déroulante.
          </div>
          )}

          <Button type="submit">Créer</Button>
        </Form>
      </Modal.Body>

    </Modal>

  );
}

export default TrackCreation;
