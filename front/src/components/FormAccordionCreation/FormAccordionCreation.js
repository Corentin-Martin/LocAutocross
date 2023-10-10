import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setElementToDisplay, setOpenCreation } from '../../actions/dashboard';

function FormAccordionCreation({ childComponent, message }) {
  const [openItem, setOpenItem] = useState(null);
  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);

  const dispatch = useDispatch();
  const isOpenCreationModal = useSelector((state) => state.dashboard.isOpenCreationModal);

  const handleAccordionToggle = (eventKey) => {
    setOpenItem(openItem === eventKey ? null : eventKey);
  };

  useEffect(() => {
    if (isOpenCreationModal) {
      setOpenItem('0');
    }
    else {
      setOpenItem(null);
    }
  }, [isOpenCreationModal]);

  useEffect(() => {
    if (elementToDisplay) {
      setOpenItem(null);
      dispatch(setOpenCreation(false));
    }
  }, [elementToDisplay]);

  useEffect(() => () => {
    dispatch(setOpenCreation(false));
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <Accordion
        className="col-12 mt-2 mb-2"
        activeKey={openItem}
        onClick={() => {
          dispatch(setElementToDisplay(null));
          dispatch(setOpenCreation(!isOpenCreationModal));
        }}
      >

        <Accordion.Item eventKey="0" onClick={() => handleAccordionToggle('0')}>
          <Accordion.Header className="text-center bg-secondary">
            {message}
          </Accordion.Header>
          <Accordion.Body onClick={(e) => {
            e.stopPropagation();
          }}
          >
            {childComponent}

          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </div>
  );
}

export default FormAccordionCreation;
