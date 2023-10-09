import { Card } from 'react-bootstrap';
import { XCircleFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setRental } from '../../actions/dashboard';

function CardComponent({ fromGestion, childComponent }) {
  const dispatch = useDispatch();

  const rental = useSelector((state) => state.dashboard.rental);

  useEffect(() => () => {
    dispatch(setRental(null));
  }, []);

  if (rental === null) {
    return null;
  }

  return (
    <div className="col-12 col-md-10">
      <Card style={{ width: '100%', position: 'relative' }} className="mt-3 text-center bg-secondary">
        {fromGestion && (
        <XCircleFill
          size={24}
          className="text-black VehicleDetail-CloseIcon"
          onClick={() => dispatch(setRental(null))}
        />
        )}
        {childComponent}
      </Card>
    </div>
  );
}

export default CardComponent;
