import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import FederationFilter from '../../components/FederationFilter/FederationFilter';
import TracksMap from '../../components/TracksMap/TracksMap';
import './Tracks.scss';
import AxiosPublic from '../../utils/AxiosPublic';
import { setTracks } from '../../actions/map';

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
            tracksToSend.push(track.track);
          });
          dispatch(setTracks(tracksToSend));
        }).catch((error) => {
          console.error(error);
        });
    }
  }, [search]);
  return (
    <div>

      <FederationFilter onlyChampionships />
      <TracksMap />
    </div>
  );
}

export default Tracks;
