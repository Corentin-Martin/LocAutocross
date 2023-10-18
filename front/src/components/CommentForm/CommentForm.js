import './CommentForm.scss';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Star, StarFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import AxiosPrivate from '../../utils/AxiosPrivate';

function CommentForm({ rentalId }) {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(null);
  const [wrong, setWrong] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content === '') {
      setWrong(true);
    }
    else {
      AxiosPrivate.post(`comments/${rentalId}`, {
        content: content,
        rating: rating,
      }).then((response) => {
        navigate(`/utilisateur/${response.data.rental.ownerUser.id}`);
      }).catch((error) => {
        console.error(error);
      });
    }
  };

  const handleStarClick = (value) => {
    setRating(value);
  };
  return (
    <Form onSubmit={handleSubmit} className="col-12 d-flex flex-column justify-content-center align-items-center" style={{ flexGrow: '1' }}>
      <Form.Group className="mb-1 col-12 col-md-8 text-center" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Mon commentaire *</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          onChange={(e) => setContent(e.currentTarget.value)}
          placeholder="Laissez-nous votre avis ici..."
        />
      </Form.Group>
      <Form.Group className="mb-3 col-12 col-md-8 text-center" controlId="rating">
        <Form.Label>Ma note</Form.Label>
        <div>
          {[1, 2, 3, 4, 5].map((value) => {
            if (rating >= value) {
              return <StarFill className="star me-1" key={value} onClick={() => handleStarClick(value)} />;
            }
            return (
              <Star
                key={value}
                className="star me-1"
                onClick={() => handleStarClick(value)}
              />
            );
          })}
        </div>
      </Form.Group>
      {wrong && <div className="alert alert-danger text-center">Vous devez renseigner un commentaire avant d'envoyer.</div>}
      <Button type="submit" className="mb-2">Envoyer mon commentaire</Button>
    </Form>
  );
}

export default CommentForm;
