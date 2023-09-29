import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import './BrandCreation.scss';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setNewBrand } from '../../actions/dashboard';

function BrandCreation({ showBrandCreation }) {
  const [brandName, setBrandName] = useState('');
  const [show, setShow] = useState(showBrandCreation);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (brandName !== '') {
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
          setShow(false);
          dispatch(setNewBrand(response.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
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
          <Button type="submit">Créer</Button>
        </Form>
      </Modal.Body>

    </Modal>
  );
}

export default BrandCreation;
