import { useEffect, useState } from 'react';
import {
  Alert,
  Badge, Button, FloatingLabel, Form, Row, Spinner,
} from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import AxiosPublic from '../../utils/AxiosPublic';
import { setOpenTrackCreation } from '../../actions/dashboard';
import TrackCreation from '../TrackCreation/TrackCreation';
import AxiosPrivate from '../../utils/AxiosPrivate';

function EventCreation() {
  const federations = useSelector((state) => state.generalCalendar.federations);
  const openTrackCreation = useSelector((state) => state.dashboard.openTrackCreation);
  const [isLoading, setIsLoading] = useState(true);
  const [tracks, setTracks] = useState(null);

  const newTrack = useSelector((state) => state.dashboard.newTrack);

  const dispatch = useDispatch();

  useEffect(() => {
    AxiosPublic.get('tracks')
      .then((response) => {
        setTracks(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [newTrack]);

  const [fedeChoice, setFedeChoice] = useState(null);
  const [champChoice, setChampChoice] = useState(null);

  const [privateEvent, setPrivateEvent] = useState(false);

  const [track, setTrack] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [allDay, setAllDay] = useState(false);
  const [description, setDescription] = useState(null);
  const [title, setTitle] = useState(null);

  useEffect(() => {
    if (newTrack !== null) {
      setTrack(newTrack);
    }
  }, [newTrack]);

  const [wrong, setWrong] = useState([]);

  const verification = () => {
    let verif = true;
    const error = [];
    if ((champChoice === null && !privateEvent)) {
      error.push('Vous devez sélectionner un championnat');
      verif = false;
    }

    if (track === null) {
      error.push('Vous devez choisir un circuit');
      verif = false;
    }

    if (start === null) {
      error.push('Vous devez choisir une date de début');
      verif = false;
    }

    if (end === null) {
      error.push('Vous devez choisir une date de fin');
      verif = false;
    }

    setWrong(error);
    return verif;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (verification()) {
      AxiosPrivate.post('events', {
        track: track,
        championship: (champChoice !== 0 ? champChoice : null),
        title: title,
        isOfficial: !privateEvent,
        allDay: allDay,
        start: start,
        end: end,
        description: description,

      }).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.error(error);
      });
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      ) : (
        <>

          {openTrackCreation && <TrackCreation />}
          <Form className="d-flex flex-column align-items-center bg-primary rounded-4 p-2 col-12" onSubmit={handleSubmit}>

            <FloatingLabel
              controlId="floatingInput44"
              label="Titre"
              className="mb-3 col-10"
            >
              <Form.Control
                type="text"
                placeholder="titre"
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
            </FloatingLabel>

            <Form.Group controlId="championshipSelect" className="mb-3 col-10">
              <Form.Label>Championnat *
                {!privateEvent && fedeChoice !== null && (
                <Badge bg="tertiary" className="me-2">{fedeChoice.alias}
                  <X
                    size="20"
                    onClick={() => {
                      setFedeChoice(null);
                      setChampChoice(null);
                    }}
                  />
                </Badge>
                )}

                {privateEvent && (
                <Badge bg="tertiary" className="me-2">Evenement privé
                  <X
                    size="20"
                    onClick={() => {
                      setPrivateEvent(false);
                      setChampChoice(null);
                      setFedeChoice(null);
                    }}
                  />
                </Badge>
                )}
              </Form.Label>

              <Row className="text-center d-flex justify-content-around align-items-center">

                {fedeChoice === null && (
                <>{federations.map((fede) => (
                  <Button type="button" variant="tertiary" className="mt-1 col-12 col-md-7" key={fede.id} onClick={() => setFedeChoice(fede)}>{fede.alias}</Button>
                ))}
                  <Button
                    type="button"
                    variant="tertiary"
                    className="mt-1 col-12 col-md-7"
                    onClick={() => {
                      setFedeChoice({ id: 0 }); setChampChoice(0);
                      setPrivateEvent(true);
                    }}
                  >Evenement privé
                  </Button>
                </>
                )}

                {fedeChoice !== null && fedeChoice.id !== 0
&& (
<Form.Select
  aria-label="Default select example"
  onChange={(e) => setChampChoice(e.target.value)}
>
  <option>Sélectionnez un championnat</option>
  {fedeChoice.championships.map((champ) => (
    <option
      value={champ.id}
      key={champ.id}
    >
      {champ.alias}
    </option>
  ))}
</Form.Select>
)}

              </Row>
            </Form.Group>

            <Form.Group controlId="trackSelect" className="mb-3 col-10">
              <Form.Label>Circuit *</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setTrack(e.target.value)}
                value={track ? track.id : ''}
              >
                <option>Sélectionnez un circuit</option>
                {tracks.map((oneTrack) => (
                  <option
                    value={oneTrack.id}
                    key={oneTrack.id}
                  >
                    {`${oneTrack.city} / ${oneTrack.postCode} / ${oneTrack.department}`}
                  </option>
                ))}
              </Form.Select>
              <div className="mt-2 text-center bg-secondary rounded-2 p-2">
                Le circuit n'existe pas ?
                <span
                  className="badge bg-primary text-black p-1"
                  style={{ cursor: 'pointer' }}
                  onClick={() => dispatch(setOpenTrackCreation(true))}
                >Voulez-vous le créer ?
                </span>
              </div>
            </Form.Group>
            <Form.Group controlId="startSelect" className="mb-3 col-10">
              <Form.Label className="text-center">Début *</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="Sélectionnez le jour de début"
                onChange={(e) => setStart(e.currentTarget.value)}
              />
            </Form.Group>
            <Form.Group controlId="endSelect" className="mb-3 col-10">
              <Form.Label className="text-center">Fin *</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="Sélectionnez le jour de fin"
                onChange={(e) => setEnd(e.currentTarget.value)}
              />
            </Form.Group>
            <Form.Group controlId="allDaySelect" className="mb-3 col-10">
              <Form.Label>Session</Form.Label>

              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label="Journée entière ?"
                onChange={() => setAllDay(!allDay)}
              />
              <p className="text-center bg-secondary rounded-2 p-2">
                Cochez cette case si l'évenènement se déroule sur une
                (ou plusieurs) journée(s) entière(s). Laissez
                la vide si c'est une session avec des horaires précis.
              </p>

            </Form.Group>

            <FloatingLabel
              controlId="floatingInput4"
              label="Description"
              className="mb-3 col-10"
            >
              <Form.Control
                type="textarea"
                placeholder="description"
                style={{ height: '100px' }}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </FloatingLabel>

            <p className="mb-3">* Champs obligatoires</p>

            <Button type="submit" variant="secondary">Créer</Button>

            {wrong.length > 0 && (
            <Alert variant="danger" className="text-center mt-2 col-10">
              <Alert.Heading>Erreur{wrong.length > 1 ? 's' : ''}</Alert.Heading>
              {wrong.map((error) => (<p key={error}>{error}</p>))}
            </Alert>
            )}

          </Form>
        </>
      )}
    </div>
  );
}

export default EventCreation;
