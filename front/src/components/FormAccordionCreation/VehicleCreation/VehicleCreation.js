import { useEffect, useRef, useState } from 'react';
import './VehicleCreation.scss';
import {
  Form, FloatingLabel, Button, Accordion, Alert,
} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  setElementToDisplay,
  setElementToEdit,
  setMyVehicles, setOpenCreation,
} from '../../../actions/dashboard';
import Checkbox from './Checkbox/Checkbox';
import BrandCreation from '../../MasterModal/BrandCreation/BrandCreation';
import AxiosPrivate from '../../../utils/AxiosPrivate';
import AxiosPublic from '../../../utils/AxiosPublic';
import handleFileUpload from '../../../utils/UploadImage';

import MasterModal from '../../MasterModal/MasterModal';

function VehicleCreation() {
  const isOpenCreationModal = useSelector((state) => state.dashboard.isOpenCreationModal);
  const elementToEdit = useSelector((state) => state.dashboard.elementToEdit);
  const vehicles = useSelector((state) => state.dashboard.myVehicles);

  const [brands, setBrands] = useState([]);
  const [disciplines, setDisciplines] = useState([]);

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
  const newBrand = useSelector((state) => state.dashboard.newItemByModal);

  const dispatch = useDispatch();

  useEffect(() => {
    if (elementToEdit !== null) {
      setModel(elementToEdit.model ?? '');
      setBrand(elementToEdit.brand);
      setEngine(elementToEdit.engine);
      setShocks(elementToEdit.shocks ?? '');
      setDescription(elementToEdit.description ?? '');
      setPicture(elementToEdit.picture ?? '');
      setYear(elementToEdit.year);
      setCategories(elementToEdit.category.map((cat) => cat.id));
    }
  }, [elementToEdit]);

  useEffect(() => {
    AxiosPublic.get('brands')
      .then((resp) => {
        setBrands(resp.data);

        AxiosPublic.get('disciplines')
          .then((response) => {
            setDisciplines(response.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [newBrand]);

  const [wrong, setWrong] = useState([]);

  const verification = () => {
    let verif = true;
    const error = [];
    if (brand === null
      || (brands.filter((brandFilter) => brandFilter.id === brand.id).length !== 1)) {
      error.push('La marque du véhicule est obligatoire');
      verif = false;
    }

    if (!engine) {
      error.push('Vous devez renseigner le moteur du véhicule');
      verif = false;
    }

    if (categories.length === 0) {
      error.push('Le véhicule doit appartenir à au moins une catégorie');
      verif = false;
    }

    setWrong(error);
    return verif;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (verification()) {
      const pictureToSend = (!picture ? null : picture);
      const descriptionToSend = (!description ? null : description);
      const modelToSend = (!model ? null : model);
      const shocksToSend = (!shocks ? null : shocks);

      if (elementToEdit === null) {
        AxiosPrivate.post(
          'vehicles',
          {
            model: modelToSend,
            brand: brand.id,
            engine: engine,
            shocks: shocksToSend,
            description: descriptionToSend,
            picture: pictureToSend,
            year: year,
            category: categories,
          },
        )
          .then((response) => {
            dispatch(setOpenCreation(false));
            dispatch(setElementToDisplay(response.data));

            dispatch(setMyVehicles([...vehicles, response.data]));
          })
          .catch((err) => {
            console.error(err);
          });
      }
      else {
        AxiosPrivate.put(
          `vehicles/${elementToEdit.id}`,
          {
            model: modelToSend,
            brand: brand.id,
            engine: engine,
            shocks: shocksToSend,
            description: descriptionToSend,
            picture: pictureToSend,
            year: year,
            category: categories,
          },
        )
          .then((response) => {
            dispatch(setOpenCreation(false));
            dispatch(setElementToDisplay(response.data));
            dispatch(setElementToEdit(null));

            const vehiclesUpdated = vehicles.map((vehicle) => {
              if (vehicle.id === response.data.id) {
                return response.data;
              }

              return vehicle;
            });

            dispatch(setMyVehicles(vehiclesUpdated));
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  const handleYearChange = (e) => {
    const yearSelect = parseInt(e.target.value, 10);
    setSelectedYear(yearSelect);
    setYear(`${yearSelect}-01-01`);
  };

  const handlePictureUpload = async (e) => {
    const base64 = await handleFileUpload(e);
    setPicture(base64);
  };

  const dataRef = useRef();
  const [match, setMatch] = useState(false);
  const [brandSearch, setBrandSearch] = useState('');

  useEffect(() => {
    if (newBrand != null) {
      setBrand(newBrand);
    }
  }, [newBrand]);

  const handleBrandChange = (e) => {
    setBrandSearch(e.target.value);
    const selectedBrand = brands.find((oneBrand) => oneBrand.name === e.target.value);

    for (let i = 0; i < dataRef.current.options.length; i += 1) {
      if (dataRef.current.options[i].value.trim().toUpperCase()
        .includes(e.target.value.trim().toUpperCase())) {
        setMatch(true);
        break;
      }
      setMatch(false);
    }

    if (selectedBrand) {
      setBrand(selectedBrand);
    }
    else {
      setBrand(null);
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

  useEffect(() => {
    if (!isOpenCreationModal) {
      dispatch(setElementToEdit(null));

      setModel('');
      setBrand('');
      setEngine('');
      setShocks('');
      setDescription('');
      setPicture('');
      setYear('2023-01-01');
      setCategories([]);
      setWrong([]);
    }
  }, [isOpenCreationModal]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setShowToParent = (bool) => {
    setShow(bool);
  };

  return (

    <Form onSubmit={handleSubmit} className="d-flex flex-column align-items-center bg-secondary rounded-4 p-2 col-12">

      {show
      && (
      <MasterModal
        show={show}
        handleClose={handleClose}
        title="Nouvelle marque"
        childComponent={<BrandCreation setShowToParent={setShowToParent} />}
      />
      )}

      <Form.Group controlId="pictureSelect" className="mb-3 col-10">
        <Form.Label>Photo</Form.Label>
        <Form.Control
          type="file"
          label="Image"
          name="myFile"
          accept=".jpeg, .png, .jpg"
          onChange={(e) => handlePictureUpload(e)}
        />
      </Form.Group>

      <Form.Group controlId="yearSelect" className="mb-3 col-10">
        <Form.Label className="text-center">Année *</Form.Label>
        <Form.Control
          type="number"
          placeholder="Sélectionnez l'année"
          value={elementToEdit !== null ? moment(year).format('YYYY') : selectedYear}
          onChange={handleYearChange}
        />
      </Form.Group>

      <Form.Group controlId="brandSelect" className="mb-3 col-10">
        <Form.Label>Marque *</Form.Label>
        <Form.Control
          type="text"
          placeholder="Sélectionnez une marque"
          list="brandsList"
          value={brand ? brand.name : brandSearch}
          onChange={handleBrandChange}
        />
        <datalist id="brandsList" ref={dataRef}>
          {brands.map((oneBrand) => (
            <option key={oneBrand.id} value={oneBrand.name} />
          ))}
        </datalist>
        {!match && !brand && brandSearch !== '' && (
          <div className="text-danger mt-2 text-center">
            Aucune correspondance trouvée.
            <span
              className="badge bg-primary text-black p-1"
              style={{ cursor: 'pointer' }}
              onClick={handleShow}
            >Voulez-vous ajouter une nouvelle marque ?
            </span>
          </div>
        )}
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
        label="Moteur *"
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
        <Form.Label>Catégorie(s) *</Form.Label>

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

      <p className="mb-3">* Champs obligatoires</p>

      <Button type="submit">{!elementToEdit ? 'Créer' : 'Modifier'}</Button>
      {wrong.length > 0 && (
        <Alert variant="danger" className="text-center mt-2">
          <Alert.Heading>Erreur{wrong.length > 1 ? 's' : ''}</Alert.Heading>
          {wrong.map((error) => (<p key={error}>{error}</p>))}
        </Alert>
      )}
    </Form>

  );
}

export default VehicleCreation;
