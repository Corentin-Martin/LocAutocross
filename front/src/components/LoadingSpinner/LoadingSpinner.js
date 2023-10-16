import { Spinner } from 'react-bootstrap';

function LoadingSpinner() {
  return (
    <Spinner animation="border" variant="primary" role="status" className="align-self-center">
      <span className="visually-hidden">Chargement...</span>
    </Spinner>
  );
}

export default LoadingSpinner;
