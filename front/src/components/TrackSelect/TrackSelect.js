import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AxiosPublic from '../../utils/AxiosPublic';
import { setTracks } from '../../actions/map';

function TrackSelect() {
  const federations = useSelector((state) => state.generalCalendar.federations);
  const tracks = useSelector((state) => state.map.tracks);
  const [choice, setChoice] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (choice === null || choice === 'Choisissez') {
      AxiosPublic.get('tracks')
        .then((response) => {
          dispatch(setTracks(response.data));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [choice]);

  useEffect(() => {
    if (choice !== null && choice !== 'Choisissez') {
      AxiosPublic.get(`championships/${choice}?tracks`)
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
  }, [choice]);

  return (
    <div>

      {federations.map((fd) => (

        <div key={fd.id}>
          <h1>{fd.alias}</h1>
          <select onChange={(e) => {
            setChoice(e.currentTarget.value);
          }}
          >
            <option>Choisissez</option>

            {fd.championships.map((champ) => (
              <option key={champ.id} value={champ.id}>{champ.alias}</option>
            ))}
          </select>

        </div>
      ))}
    </div>
  );
}

export default TrackSelect;
