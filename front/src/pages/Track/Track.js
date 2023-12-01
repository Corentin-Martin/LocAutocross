import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { setElementToDisplay } from '../../actions/dashboard';
import AxiosPublic from '../../utils/AxiosPublic';
import CardComponent from '../../components/CardComponent/CardComponent';
import TrackComponent from '../../components/CardComponent/TrackComponent/TrackComponent';
import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';
import { setTracks } from '../../actions/map';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function Track() {
  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);
  const { trackId } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (elementToDisplay === null) {
      AxiosPublic.get(`tracks/${trackId}`)
        .then((response) => {
          dispatch(setElementToDisplay(response.data));
          dispatch(setTracks([response.data]));
          setIsLoading(false);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            navigate('/*');
          }
          else {
            console.error(err);
          }
        });
    }
    else {
      setIsLoading(false);
    }
  }, [elementToDisplay]);

  if (elementToDisplay === null) {
    return <LoadingSpinner />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (

    <GeneralLayout
      pageTitle={`Circuit de ${elementToDisplay.city}`}
      description={`Découvrez toutes les informations relatives au circuit d'Autocross de ${elementToDisplay.city}`}
      childComponent={(
        <CardComponent
          childComponent={<TrackComponent track={elementToDisplay} />}
        />
            )}
    />

  );
}

export default Track;
