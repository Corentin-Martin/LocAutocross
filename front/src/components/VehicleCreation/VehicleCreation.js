import { useEffect, useState } from 'react';
import './VehicleCreation.scss';
import {
  Form, FloatingLabel, Spinner, Button,
} from 'react-bootstrap';
import axios from 'axios';

function VehicleCreation() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [model, setModel] = useState(null);
  const [brand, setBrand] = useState(null);
  const [engine, setEngine] = useState(null);
  const [shocks, setShocks] = useState(null);
  const [description, setDescription] = useState(null);
  const [picture, setPicture] = useState(null);
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState('2023-01-01');
  const [selectedYear, setSelectedYear] = useState(currentYear);

  useEffect(() => {
    axios.get('http://localhost:8000/api/brands')
      .then((resp) => {
        setBrands(resp.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(year);
  };

  const handleYearChange = (e) => {
    const yearSelect = parseInt(e.target.value, 10);
    setSelectedYear(yearSelect);
    setYear(`${yearSelect}-01-01`);
    // Faites ce que vous voulez avec l'année sélectionnée.
  };

  const convertToBase64 = (file) => new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPicture(base64);
  };

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    const selectedBrand = brands.find((oneBrand) => oneBrand.name === e.target.value);

    if (selectedBrand) {
      setBrand(selectedBrand);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (

        <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
          <Form.Group controlId="brandSelect">
            <Form.Label>Marque</Form.Label>
            <Form.Control
              type="text"
              placeholder="Sélectionnez une marque"
              list="brandsList" // Utilisez le datalist ici
              value={brand ? brand.name : ''}
              onChange={handleBrandChange}
            />
            <datalist id="brandsList">
              {brands.map((oneBrand) => (
                <option key={oneBrand.id} value={oneBrand.name} />
              ))}
            </datalist>
          </Form.Group>

          <FloatingLabel
            controlId="floatingInput"
            label="Modèle"
            className="mb-3 col-8"
          >
            <Form.Control
              onChange={(event) => {
                setModel(event.currentTarget.value);
              }}
              type="text"
              placeholder="modèle"
            />
          </FloatingLabel>

          <Form.Group controlId="yearSelect">
            <Form.Label>Année</Form.Label>
            <Form.Control
              type="number"
              placeholder="Sélectionnez l'année"
              value={selectedYear}
              onChange={handleYearChange}
            />
          </Form.Group>

          <FloatingLabel
            controlId="floatingInput2"
            label="Moteur"
            className="mb-3 col-8"
          >
            <Form.Control
              onChange={(event) => {
                setEngine(event.currentTarget.value);
              }}
              type="text"
              placeholder="moteur"
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput3"
            label="Amortisseurs"
            className="mb-3 col-8"
          >
            <Form.Control
              onChange={(event) => {
                setShocks(event.currentTarget.value);
              }}
              type="text"
              placeholder="amortisseurs"
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput4"
            label="Description / Informations complémentaires"
            className="mb-3 col-8"
          >
            <Form.Control
              onChange={(event) => {
                setDescription(event.currentTarget.value);
              }}
              type="textarea"
              placeholder="description"
            />
          </FloatingLabel>

          <Form.Group controlId="pictureSelect">
            <Form.Label>Photo</Form.Label>
            <Form.Control
              type="file"
              label="Image"
              name="myFile"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => handleFileUpload(e)}
            />
          </Form.Group>

          <Button type="submit">Creer</Button>
        </Form>
      )}
    </div>
  );
}

export default VehicleCreation;
