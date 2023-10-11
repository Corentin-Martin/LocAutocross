import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import AxiosPublic from '../../utils/AxiosPublic';

function ModalResetPassword({ show, handleClose }) {
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

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Réinitialisation de mot de passe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!submit ? (
          <Form onSubmit={handleResetSubmit}>
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
        )
          : (
            <div className="text-center">
              <p>Si un compte est lié à cette adresse,
                un email contenant un lien pour réinitialiser le mot de passe vient d'être envoyé.
              </p>
              <p>Ce lien expirera dans 1 heure.</p>
              <p>Si vous n'avez pas reçu d'email, vérifiez vos spams ou <span className="fw-bold text-decoration-underline" onClick={() => setSubmit(false)}>essayez de nouveau</span>.</p>
            </div>
          )}

      </Modal.Body>
    </Modal>
  );
}

export default ModalResetPassword;
