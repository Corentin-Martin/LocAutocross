import { Link } from 'react-router-dom';

function ErrorComponent({ content }) {
  return (
    <>
      <p>{content}</p>
      <Link to="/" className="text-decoration-none badge bg-primary p-2">Retourner à l'accueil</Link>
    </>
  );
}

export default ErrorComponent;
