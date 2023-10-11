import './CardComponent.scss';
import { Card } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setElementToDisplay } from '../../actions/dashboard';

function CardComponent({ fromGestion, childComponent }) {
  const dispatch = useDispatch();

  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);

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

export default CardComponent;
