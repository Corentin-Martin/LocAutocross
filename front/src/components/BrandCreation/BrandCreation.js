import {
  Button, FloatingLabel, Form, Modal,
} from 'react-bootstrap';
import './BrandCreation.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNewBrand, setOpenBrandCreation } from '../../actions/dashboard';
import AxiosPublic from '../../utils/AxiosPublic';
import AxiosPrivate from '../../utils/AxiosPrivate';

function BrandCreation() {
  const [brandName, setBrandName] = useState('');
  const [brandExist, setBrandExist] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setBrandExist(false);
    AxiosPublic.get(`brands?name=${brandName}`)
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
      AxiosPrivate.post('brands', { name: brandName })
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
