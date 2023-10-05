import { useEffect, useState } from 'react';
import { Alert, FloatingLabel, Form } from 'react-bootstrap';

function Password({ sendPasswordToParent }) {
  const [password, setPassword] = useState(null);
  const [pastePassword, setPastePassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [displayRequirements, setDisplayRequirements] = useState(false);
  const [length, setLength] = useState(true);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [digit, setDigit] = useState(true);
  const [specialChars, setSpecialChars] = useState(true);
  const [samePasswords, setSamePasswords] = useState(true);

  const handlePaste = (event) => {
    event.preventDefault();
    setPastePassword(true);
  };

  const isStrongPassword = (passwordToVerify) => {
    setLength(
      passwordToVerify.length < 12 ?? false,
    );

    setUppercase(
      !/[A-Z]/.test(passwordToVerify) ?? false,
    );

    setLowercase(
      !/[a-z]/.test(passwordToVerify) ?? false,
    );

    setDigit(
      !/\d/.test(passwordToVerify) ?? false,
    );

    const specialCharsToVerify = "!@#$%^&*()_-+=?{}[]|:;.,~`'\"\\/";

    let hasSpecialChar = false;
    for (let i = 0; i < passwordToVerify.length; i += 1) {
      if (specialCharsToVerify.includes(passwordToVerify[i])) {
        hasSpecialChar = true;
        break;
      }
    }

    setSpecialChars(!hasSpecialChar ?? false);
  };

  const areSamePasswords = (passwordToVerify) => {
    setSamePasswords(passwordToVerify === password);
  };

  useEffect(() => {
    if (samePasswords && (password === confirmPassword)) {
      sendPasswordToParent(password);
    }
  }, [samePasswords]);

  return (
    <>
      <FloatingLabel
        controlId="floatingPassword"
        className="mb-3 col-8"
        label="Mot de passe"
        onFocus={() => {
          setDisplayRequirements(true);
        }}
      >
        <Form.Control
          onChange={(event) => {
            setPassword(event.currentTarget.value);
            isStrongPassword(event.currentTarget.value);
          }}
          type="password"
          placeholder="Password"
        />
      </FloatingLabel>

      {displayRequirements && (
        <p className="text-center">Votre mot de passe doit contenir au moins <span className={!lowercase ? 'text text-success' : 'text text-danger'}>une minuscule, </span>
          <span className={!uppercase ? 'text text-success' : 'text text-danger'}>une majuscule, </span>
          <span className={!digit ? 'text text-success' : 'text text-danger'}>un chiffre, </span>
          <span className={!specialChars ? 'text text-success' : 'text text-danger'}>un caractère spécial, </span>
          <span className={!length ? 'text text-success' : 'text text-danger'}>12 caractères.</span>
        </p>

      )}

      <FloatingLabel
        controlId="floatingConfirmPassword"
        className="mb-3 col-8"
        label="Confirmez votre mot de passe"
        onFocus={() => {
          setDisplayRequirements(false);
        }}
      >
        <Form.Control
          onPaste={handlePaste}
          onChange={(event) => {
            setConfirmPassword(event.currentTarget.value);
            setPastePassword(false);
            areSamePasswords(event.currentTarget.value);
          }}
          type="password"
          placeholder="ConfirmPassword"
        />
      </FloatingLabel>
      {!samePasswords && <p className="text text-center text-danger">Les deux mots de passe doivent être identiques.</p>}
      {pastePassword && (
        <Alert variant="danger" className="col-8 text-center">
          Vous devez retaper votre mot de passe.
        </Alert>
      )}
    </>
  );
}

export default Password;
