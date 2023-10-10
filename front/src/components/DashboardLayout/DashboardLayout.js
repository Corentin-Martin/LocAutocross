import { Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Under992 from './Under992/Under992';
import Over992 from './Over992/Over992';

function DashboardLayout({
  infos, creativePart, myThings, detail, title,
}) {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Row className="d-flex justify-content-center">

      <h1 className="text-center">{title}</h1>

      {width < 992
        ? <Under992 infos={infos} creativePart={creativePart} myThings={myThings} detail={detail} />
        : <Over992 infos={infos} creativePart={creativePart} myThings={myThings} detail={detail} />}

    </Row>
  );
}

export default DashboardLayout;
