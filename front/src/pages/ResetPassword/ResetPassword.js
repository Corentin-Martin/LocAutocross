import { Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setResetToken } from '../../actions/user';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';

function ResetPassword() {
  const { token } = useParams();

  const resetToken = useSelector((state) => state.user.resetToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (resetToken === null) {
      dispatch(setResetToken(token));
      navigate('/reset');
    }
  }, []);

  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">Réinitialiser votre mot de passe</h1>

      <ResetPasswordForm />

    </Row>
  );
}

export default ResetPassword;
