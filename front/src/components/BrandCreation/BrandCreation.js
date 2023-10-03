import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import './BrandCreation.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setNewBrand, setOpenBrandCreation } from '../../actions/dashboard';

function BrandCreation() {
  const [brandName, setBrandName] = useState('');
  const [brandExist, setBrandExist] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setBrandExist(false);
    axios.get(
      `http://localhost:8000/api/brands?name=${brandName}`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },

    )
      .then((response) => {
        if (response.status !== 204) {
          setBrandExist(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [brandName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (brandName !== '' && !brandExist) {
      axios.post(
        'http://localhost:8000/api/brands',
        {
          name: brandName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },

      )
        .then((response) => {
          dispatch(setOpenBrandCreation(false));
          dispatch(setNewBrand(response.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Modal show onHide={() => dispatch(setOpenBrandCreation(false))}>
      <Modal.Header closeButton>
        <Modal.Title>Nouvelle marque</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingInput"
            label="Nom"
            className="mb-3"
          >
            <Form.Control type="text" placeholder="Peugeot" onChange={(e) => setBrandName(e.currentTarget.value)} value={brandName} />
          </FloatingLabel>
          {brandExist
          && (
          <div className="text-danger mt-2 text-center">
            Cette marque existe déjà.
          </div>
          )}

          {!brandExist
          && <Button type="submit">Créer</Button>}
        </Form>
      </Modal.Body>

    </Modal>
  );
}

export default BrandCreation;
