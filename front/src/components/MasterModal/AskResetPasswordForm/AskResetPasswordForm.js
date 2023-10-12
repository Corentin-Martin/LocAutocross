import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import AxiosPublic from '../../../utils/AxiosPublic';

function AskResetPasswordForm() {
  const [mailToReset, setMailToReset] = useState('');
  const [submit, setSubmit] = useState(false);

  const handleResetSubmit = (event) => {
    event.preventDefault();
    AxiosPublic.post('reset-password', { email: mailToReset })
      .then((resp) => {
        if (resp.status === 200) {
          setMailToReset('');
          setSubmit(true);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (submit) {
    return (
      <div className="text-center">
        <p>Si un compte est lié à cette adresse,
          un email contenant un lien pour réinitialiser le mot de passe vient d'être envoyé.
        </p>
        <p>Ce lien expirera dans 1 heure.</p>
        <p>Si vous n'avez pas reçu d'email, vérifiez vos spams ou <span className="fw-bold text-decoration-underline" onClick={() => setSubmit(false)}>essayez de nouveau</span>.</p>
      </div>
    );
  }
  return (

    <Form onSubmit={handleResetSubmit} className="col-12 d-flex flex-column justify-content-center">
      <Form.Label htmlFor="inputMail">Votre adresse mail</Form.Label>
      <Form.Control
        type="email"
        id="inputMail"
        aria-describedby="emailHelpBlock"
        onChange={(e) => setMailToReset(e.currentTarget.value)}
        value={mailToReset}
      />
      <Button type="submit" className="mt-2">Envoyer</Button>
    </Form>

  );
}

export default AskResetPasswordForm;
