import './CardComponent.scss';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { setElementToDisplay } from '../../actions/dashboard';

function CardComponent({ fromGestion, childComponent }) {
  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);
  const dispatch = useDispatch();

  useEffect(() => () => {
    dispatch(setElementToDisplay(null));
  }, []);

  if (elementToDisplay === null) {
    return null;
  }

  return (

    <Card style={{ width: '100%', position: 'relative' }} className="mt-3 text-center bg-secondary">
      {fromGestion && (
        <XCircleFill
          size={24}
          className="text-black CardComponent-CloseIcon"
          onClick={() => dispatch(setElementToDisplay(null))}
        />
      )}
      {childComponent}
    </Card>

  );
}

CardComponent.defaultProps = {
  fromGestion: false,
};

CardComponent.propTypes = {
  fromGestion: PropTypes.bool,
  childComponent: PropTypes.element.isRequired,
};

export default CardComponent;
