import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { EyeFill } from 'react-bootstrap-icons';
import AxiosPrivate from '../../utils/AxiosPrivate';
import { setElementToDisplay } from '../../actions/dashboard';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function DashboardInfos({ myThings, text, type }) {
  const [isLoading, setIsLoading] = useState(true);
  const [length, setLength] = useState(0);
  const [oldest, setOldest] = useState(null);
  const [newest, setNewest] = useState(null);
  const [recentlyUpdated, setRecentlyUpdated] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (myThings) {
      const thingsToCompare = (type !== 'vehicles' ? [...myThings[0], ...myThings[1]] : myThings);

      setLength(thingsToCompare.length);

      const byCreatedAt = thingsToCompare.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
      });

      const byUpdatedAt = thingsToCompare
        .filter((vehicle) => vehicle.updatedAt !== null)
        .sort((a, b) => {
          const dateA = new Date(a.updatedAt);
          const dateB = new Date(b.updatedAt);
          return dateA - dateB;
        });

      setOldest(byCreatedAt[0]);
      setNewest(byCreatedAt[byCreatedAt.length - 1]);
      setRecentlyUpdated(byUpdatedAt[0]);
      setIsLoading(false);
    }
  }, [myThings]);

  const handleShow = (id) => {
    AxiosPrivate.get(
      `${type}/${id}`,
    )
      .then((response) => {
        dispatch(setElementToDisplay(response.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="mt-3 text-center" style={{ flexGrow: '1' }}>

      <Card style={{ width: '100%', height: '100%' }} className="d-flex justify-content-center align-items-center">

        <Card.Title>Les informations</Card.Title>
        {length > 0 ? (
          <>
            <Card.Subtitle className="mt-2">Nombre {text}{length > 1 ? 's' : ''}</Card.Subtitle>
            <Card.Text>{length}</Card.Text>
            <Card.Subtitle>Premier ajout {text}</Card.Subtitle>
            <Card.Text>{oldest ? (
              <>
                {moment(oldest.createdAt).format('DD/MM/YYYY HH:mm')} <EyeFill
                  size={24}
                  style={{ cursor: 'pointer' }}
                  className="ms-2 text-tertiary"
                  onClick={() => {
                    handleShow(oldest.id);
                  }}
                />
              </>
            )
              : ''}
            </Card.Text>
            <Card.Subtitle>Dernier ajout {text}</Card.Subtitle>
            <Card.Text>{newest ? (
              <>
                {moment(newest.createdAt).format('DD/MM/YYYY HH:mm')} <EyeFill
                  size={24}
                  style={{ cursor: 'pointer' }}
                  className="ms-2 text-tertiary"
                  onClick={() => {
                    handleShow(newest.id);
                  }}
                />
              </>
            ) : ''}
            </Card.Text>
            <Card.Subtitle>Dernière modification {text}</Card.Subtitle>
            <Card.Text>{recentlyUpdated ? (
              <>
                {moment(recentlyUpdated.updatedAt).format('DD/MM/YYYY HH:mm')} <EyeFill
                  size={24}
                  style={{ cursor: 'pointer' }}
                  className="ms-2 text-tertiary"
                  onClick={() => {
                    handleShow(recentlyUpdated.id);
                  }}
                />
              </>
            ) : '/'}
            </Card.Text>
          </>
        ) : <Card.Subtitle className="mt-3">Aucune information à afficher. Cette section est vide pour le moment.</Card.Subtitle>}

      </Card>

    </div>
  );
}

export default DashboardInfos;
