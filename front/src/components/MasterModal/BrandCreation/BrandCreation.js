import {
  Button, FloatingLabel, Form,
} from 'react-bootstrap';
import './BrandCreation.scss';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  setNewItemByModal,
} from '../../../actions/dashboard';
import AxiosPublic from '../../../utils/AxiosPublic';
import AxiosPrivate from '../../../utils/AxiosPrivate';

function BrandCreation({ setShowToParent }) {
  const [brandName, setBrandName] = useState('');
  const [brandExist, setBrandExist] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setBrandExist(false);
    AxiosPublic.get(`brands?name=${brandName}`)
      .then((response) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!response.data.hasOwnProperty('message')) {
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
          setShowToParent(false);
          dispatch(setNewItemByModal(response.data));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (

    <Form onSubmit={handleSubmit} className="col-12 d-flex flex-column justify-content-center">
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

  );
}

export default BrandCreation;
