import { Card, Col } from 'react-bootstrap';

function InfosComponent({
  childComponent, title, inColumn, bgVariant,
}) {
  return (
    <Col sm={12} md={inColumn ? 12 : 6} className="mb-2" style={{ flexGrow: '1' }}>
      <Card style={{ width: '100%', height: '100%' }} bg={bgVariant}>
        <Card.Header>{title}</Card.Header>
        <Card.Body className="d-flex align-items-center">
          <div className="text-start mx-auto">
            {childComponent}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

InfosComponent.defaultProps = {
  inColumn: false,
  bgVariant: 'light',
};

export default InfosComponent;
