import { Card } from 'react-bootstrap';

function TrackInfos({ track }) {
  return (
    <>
      {track.name !== null && <Card.Text>Nom : {track.name}</Card.Text>}
      <Card.Text>Ville : {track.city} ({track.postCode})</Card.Text>
      <Card.Text>Département : {track.department}</Card.Text>
    </>
  );
}

export default TrackInfos;
