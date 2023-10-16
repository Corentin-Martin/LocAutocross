import './Over992.scss';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

function Over992({
  infos, creativePart, myThings, detail,
}) {
  const isOpenCreationModal = useSelector((state) => state.dashboard.isOpenCreationModal);
  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);

  return (

    <Row className="d-flex justify-content-center">
      <Col className="col-12 col-lg-6 d-flex flex-column">
        {myThings}
        {infos !== null && (
        <CSSTransition
          in={elementToDisplay !== null || isOpenCreationModal}
          timeout={1000}
          classNames="your-component"
          unmountOnExit
        >
          {infos}
        </CSSTransition>
        )}

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

  );
}

Over992.defaultProps = {
  infos: null,
  creativePart: null,
  myThings: null,
  detail: null,
};

export default Over992;
