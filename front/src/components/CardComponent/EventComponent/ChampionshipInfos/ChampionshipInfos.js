import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ChampionshipInfos({ championship }) {
  return (
    <>
      <Card.Text>Nom : {championship.name} ({championship.alias})</Card.Text>
      <Card.Text>Fédération : {championship.federation.alias}</Card.Text>
    </>
  );
}

ChampionshipInfos.propTypes = {
  championship: PropTypes.object.isRequired,
};

export default ChampionshipInfos;
