import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setElementToDisplay } from '../../actions/dashboard';
import LoginForm from '../../components/LoginForm/LoginForm';
import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';
import MasterModal from '../../components/MasterModal/MasterModal';
import AskResetPasswordForm from '../../components/MasterModal/AskResetPasswordForm/AskResetPasswordForm';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state !== null) {
      dispatch(setElementToDisplay(location.state.rental));
    }
  }, []);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <GeneralLayout
      title="Connexion"
      pageTitle="Connexion"
      description="Connectez-vous et trouvez la location idéale pour rouler sur les piste de France ou mettez votre véhicule à louer."
      childComponent={(
        <>

          <LoginForm />

          <div
            className="badge mt-2 bg-danger col-6 col-md-4 col-lg-2"
            onClick={handleShow}
          >Mot de passe oublié ?
          </div>

          <p
            className="text-center mt-3"
          >Vous n'avez pas encore de compte ?
            <span
              className="badge bg-primary ms-2"
              onClick={() => navigate('/inscription', location.state !== null ? { state: { rental: location.state.rental } } : '')}
            >Inscrivez-vous
            </span>
          </p>

          <MasterModal
            show={show}
            handleClose={handleClose}
            title="Réinitialisation de mot de passe"
            childComponent={<AskResetPasswordForm />}
          />
        </>
    )}
    />

  );
}

export default Login;
