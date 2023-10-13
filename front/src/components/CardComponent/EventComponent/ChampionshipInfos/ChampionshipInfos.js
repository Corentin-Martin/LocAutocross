import { Card } from 'react-bootstrap';

function ChampionshipInfos({ championship }) {
  return (
    <>
      <Card.Text>Nom : {championship.name} ({championship.alias})</Card.Text>
      <Card.Text>Fédération : {championship.federation.alias}</Card.Text>
    </>
  );
}

export default ChampionshipInfos;
