import { Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Under992 from './Under992/Under992';
import Over992 from './Over992/Over992';

function DashboardLayout({
  infos, creativePart, myThings, detail, title, pageTitle, description,
}) {
  useEffect(() => {
    document.title = `Loc'Autocross - ${pageTitle ?? ''}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description !== null) {
      metaDescription.setAttribute('content', `Loc'Autocross - ${description}`);
    }
  }, [title, description]);

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

DashboardLayout.defaultProps = {
  infos: null,
  creativePart: null,
  myThings: null,
  detail: null,
  title: null,
  pageTitle: null,
  description: null,
};
export default DashboardLayout;
