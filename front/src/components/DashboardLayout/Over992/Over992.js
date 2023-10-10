import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

function Over992({
  infos, creativePart, myThings, detail,
}) {
  const isOpenCreationModal = useSelector((state) => state.dashboard.isOpenCreationModal);
  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);

  return (
    <div className="Vehicles-over992">

      <Row className="d-flex justify-content-center">
        <Col className="col-12 col-lg-6 d-flex flex-column">
          {myThings}
          <CSSTransition
            in={elementToDisplay !== null || isOpenCreationModal}
            timeout={1000}
            classNames="your-component"
            unmountOnExit
          >
            {infos}
          </CSSTransition>
        </Col>
        <Col className="col-12 col-lg-6 d-flex flex-column">
          {(elementToDisplay === null) && creativePart }
          <CSSTransition
            in={elementToDisplay !== null}
            timeout={1000}
            classNames="your-component"
            unmountOnExit
          >
            {detail}
          </CSSTransition>

          {(elementToDisplay === null && !isOpenCreationModal) && infos }

        </Col>

      </Row>
    </div>
  );
}

export default Over992;
