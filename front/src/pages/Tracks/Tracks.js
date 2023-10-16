import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import FederationFilter from '../../components/FederationFilter/FederationFilter';
import TracksMap from '../../components/TracksMap/TracksMap';
import AxiosPublic from '../../utils/AxiosPublic';
import { setTracks } from '../../actions/map';
import { setElementToDisplay } from '../../actions/dashboard';
import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';
import CardText from '../../components/CardText/CardText';
import TrackText from '../../components/CardText/TrackText/TrackText';

function Tracks() {
  const search = useSelector((state) => state.generalCalendar.search);

  const dispatch = useDispatch();

  useEffect(() => {
    if (search === null) {
      AxiosPublic.get('tracks')
        .then((response) => {
          dispatch(setTracks(response.data));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [search]);

  useEffect(() => {
    if (search !== null) {
      AxiosPublic.get(`championships/${search}?tracks`)
        .then((response) => {
          const tracksToSend = [];

          response.data.tracks.forEach((track) => {
            tracksToSend.push(track);
          });
          dispatch(setTracks(tracksToSend));
        }).catch((error) => {
          console.error(error);
        });
    }
  }, [search]);

  useEffect(() => {
    dispatch(setElementToDisplay(true));

    return () => {
      dispatch(setElementToDisplay(null));
    };
  }, []);

  return (
    <GeneralLayout
      title="Les circuits"
      pageTitle="Les circuits"
      description="Découvrez tous les circuits de France et réservez une location pour l'épreuve de votre choix !"
      childComponent={(
        <>
          <CardText childComponent={<TrackText />} />
          <FederationFilter onlyChampionships />
          <TracksMap />
        </>
    )}
    />

  );
}

export default Tracks;
