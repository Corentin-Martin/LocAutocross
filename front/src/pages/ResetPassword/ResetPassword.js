import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setResetToken } from '../../actions/user';
import ResetPasswordForm from '../../components/ResetPasswordForm/ResetPasswordForm';
import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';

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

    <GeneralLayout
      title="Réinitialiser votre mot de passe"
      pageTitle="Réinitialisation de votre mot de passe"
      childComponent={<ResetPasswordForm />}
    />

  );
}

export default ResetPassword;
