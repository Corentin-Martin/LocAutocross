import { useEffect, useState } from 'react';
import './VehicleCreation.scss';
import {
  Form, FloatingLabel, Spinner, Button, Accordion,
} from 'react-bootstrap';
import axios from 'axios';
import { PlusCircleFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  setIdToEdit, setMyVehicles, setOpenCreation, setVehicleForDetails,
} from '../../actions/dashboard';
import Checkbox from './Checkbox/Checkbox';

function VehicleCreation() {
  const isOpenCreationModal = useSelector((state) => state.dashboard.isOpenCreationModal);
  const vehicles = useSelector((state) => state.dashboard.myVehicles);
  const vehicle = useSelector((state) => state.dashboard.vehicle);
  const idToEdit = useSelector((state) => state.dashboard.idToEdit);
  const [vehicleToEdit, setVehicleToEdit] = useState(null);
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

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    if (idToEdit === null) {
      setVehicleToEdit(null);
      setIsLoading(false);
    }
    else {
      axios.get(
        `http://localhost:8000/api/vehicles/${idToEdit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      )
        .then((response) => {
          setVehicleToEdit(response.data);
          setIsLoading(false);
          setModel(response.data.model);
          setBrand(response.data.brand);
          setEngine(response.data.engine);
          setShocks(response.data.shocks);
          setDescription(response.data.description);
          setPicture(response.data.picture);
          setYear(response.data.year);
          setCategories(response.data.category.map((cat) => cat.id));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [idToEdit]);

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
    setIsLoading(true);

    if (idToEdit === null) {
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
          setIsLoading(false);
          dispatch(setOpenCreation(false));
          dispatch(setVehicleForDetails(response.data));
          dispatch(setMyVehicles([...vehicles, response.data]));
        })
        .catch((err) => {
          console.error(err);
        });
    }
    else {
      axios.put(
        `http://localhost:8000/api/vehicles/${idToEdit}`,
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
          setIsLoading(false);
          dispatch(setOpenCreation(false));
          dispatch(setVehicleForDetails(response.data));
          console.log(response.data);
          // dispatch(setMyVehicles([...vehicles, response.data]));
        })
        .catch((err) => {
          console.error(err);
        });
    }
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

  const handleCheckboxChange = (categoryId) => {
    if (categories.includes(categoryId)) {
      setCategories(categories.filter((id) => id !== categoryId));
    }
    else {
      setCategories([...categories, categoryId]);
    }
  };

  const resetKey = categories.join(',');

  const [openItem, setOpenItem] = useState(null);

  useEffect(() => {
    if (isOpenCreationModal) {
      setOpenItem('0');
    }
    else {
      setOpenItem(null);
      setVehicleToEdit(null);

      dispatch(setIdToEdit(null));

      setModel('');
      setBrand('');
      setEngine('');
      setShocks('');
      setDescription('');
      setPicture('');
      setYear('2023-01-01');
      setCategories([]);
    }
  }, [isOpenCreationModal]);

  const handleAccordionToggle = (eventKey) => {
    setOpenItem(openItem === eventKey ? null : eventKey);
  };

  useEffect(() => {
    if (vehicle) {
      setOpenItem(null);
      dispatch(setOpenCreation(false));
    }
  }, [vehicle]);

  return (
    <div className="d-flex flex-column align-items-center">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (

        <Accordion
          className="col-12 mt-2 mb-2"
          onClick={() => {
            dispatch(setVehicleForDetails(null));
            dispatch(setOpenCreation(!isOpenCreationModal));
          }}
          activeKey={openItem}
        >

          <Accordion.Item eventKey="0" onClick={() => handleAccordionToggle('0')}>
            <Accordion.Header className="text-center bg-secondary">

              {!vehicleToEdit ? <><PlusCircleFill size={24} className="me-2" /> Ajouter un nouveau véhicule</> : 'Modification de véhicule'}
            </Accordion.Header>
            <Accordion.Body onClick={(e) => {
              e.stopPropagation();
            }}
            >
              <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center bg-secondary rounded-4 p-2 col-12">
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
                    value={vehicleToEdit !== null ? moment(year).format('YYYY') : selectedYear}
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
                    value={model}
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
                    value={engine}
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
                    value={shocks}
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
                    value={description}
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
                            <Checkbox
                              key={`${resetKey}-${category.id}`}
                              id={category.id}
                              label={category.name}
                              checked={categories.includes(category.id)}
                              onChange={() => handleCheckboxChange(category.id)}
                            />
                          ))}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>

                </Form.Group>

                <Button type="submit">Creer</Button>
              </Form>
            </Accordion.Body>
          </Accordion.Item>

        </Accordion>

      )}
    </div>
  );
}

export default VehicleCreation;
