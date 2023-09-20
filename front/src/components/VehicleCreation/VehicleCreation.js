import { useEffect, useState } from 'react';
import './VehicleCreation.scss';
import {
  Form, FloatingLabel, Spinner, Button, Accordion,
} from 'react-bootstrap';
import axios from 'axios';

function VehicleCreation() {
  const [brands, setBrands] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/brands')
      .then((resp) => {
        setBrands(resp.data);

        axios.get('http://localhost:8000/api/disciplines')
          .then((response) => {
            setDisciplines(response.data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(
      'http://localhost:8000/api/vehicles',
      {
        model: model,
        brand: brand.id,
        engine: engine,
        shocks: shocks,
        description: description,
        picture: picture,
        year: year,
        category: categories,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },

    )
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleYearChange = (e) => {
    const yearSelect = parseInt(e.target.value, 10);
    setSelectedYear(yearSelect);
    setYear(`${yearSelect}-01-01`);
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

  const handleCategoriesSelect = (e) => {
    if (categories.includes(e.currentTarget.id)) {
      const newCategories = categories.filter(
        (categorySearch) => categorySearch !== e.currentTarget.id,
      );
      setCategories(newCategories);
    }
    else {
      setCategories([...categories, e.currentTarget.id]);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (

        <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center bg-secondary rounded-4 p-2 col-12 col-md-8 col-lg-6">

          <Form.Group controlId="pictureSelect" className="mb-3 col-10">
            <Form.Label>Photo</Form.Label>
            <Form.Control
              type="file"
              label="Image"
              name="myFile"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => handleFileUpload(e)}
            />
          </Form.Group>

          <Form.Group controlId="yearSelect" className="mb-3 col-10">
            <Form.Label className="text-center">Année</Form.Label>
            <Form.Control
              type="number"
              placeholder="Sélectionnez l'année"
              value={selectedYear}
              onChange={handleYearChange}
            />
          </Form.Group>

          <Form.Group controlId="brandSelect" className="mb-3 col-10">
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
            className="mb-3 col-10"
          >
            <Form.Control
              onChange={(event) => {
                setModel(event.currentTarget.value);
              }}
              type="text"
              placeholder="modèle"
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput2"
            label="Moteur"
            className="mb-3 col-10"
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
            className="mb-3 col-10"
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
            label="Informations complémentaires"
            className="mb-3 col-10"
          >
            <Form.Control
              onChange={(event) => {
                setDescription(event.currentTarget.value);
              }}
              type="textarea"
              placeholder="description"
              style={{ height: '100px' }}
            />
          </FloatingLabel>

          <Form.Group controlId="categoriesSelect" className="mb-3 col-10">
            <Form.Label>Catégorie(s)</Form.Label>

            <Accordion>
              {disciplines.map((discipline) => (
                <Accordion.Item eventKey={discipline.id} key={discipline.id}>
                  <Accordion.Header>
                    {discipline.name} - {discipline.federation.alias}
                  </Accordion.Header>
                  <Accordion.Body>
                    {discipline.categories.map((category) => (
                      <Form.Check // prettier-ignore
                        key={category.id}
                        type="checkbox"
                        name="categories"
                        id={category.id}
                        label={category.name}
                        onChange={handleCategoriesSelect}
                      />
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>

          </Form.Group>

          <Button type="submit">Creer</Button>
        </Form>
      )}
    </div>
  );
}

export default VehicleCreation;
