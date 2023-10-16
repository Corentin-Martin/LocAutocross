import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function TrackInfos({ track }) {
  return (
    <>
      {track.name !== null && <Card.Text>Nom : {track.name}</Card.Text>}
      <Card.Text>Ville : {track.city} ({track.postCode})</Card.Text>
      <Card.Text>Département : {track.department}</Card.Text>
    </>
  );
}

TrackInfos.propTypes = {
  track: PropTypes.object.isRequired,
};

export default TrackInfos;
