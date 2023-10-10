import { Row } from 'react-bootstrap';
import Under992 from './Under992/Under992';
import Over992 from './Over992/Over992';

function DashboardLayout({
  infos, creativePart, myThings, detail, title,
}) {
  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">{title}</h1>

      <Under992 infos={infos} creativePart={creativePart} myThings={myThings} detail={detail} />
      <Over992 infos={infos} creativePart={creativePart} myThings={myThings} detail={detail} />

    </Row>
  );
}

export default DashboardLayout;
