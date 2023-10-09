import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import RentalCreation from '../RentalCreation/RentalCreation';
import EventCreation from '../EventCreation/EventCreation';

function FormAccordion({ toEdit, type }) {
  const [openItem, setOpenItem] = useState(null);

  useEffect(() => {
    if (toEdit !== null) {
      setOpenItem('0');
    }
  });

  const handleAccordionToggle = (eventKey) => {
    setOpenItem(openItem === eventKey ? null : eventKey);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <Accordion
        className="col-12 mt-2 mb-2"
        activeKey={openItem}
      >

        <Accordion.Item eventKey="0" onClick={() => handleAccordionToggle('0')}>
          <Accordion.Header className="text-center bg-secondary">
            {type === 'rental' && (toEdit === null ? 'Créer une nouvelle proposition de location' : 'Editer cette proposition de location')}
            {type === 'event' && (toEdit === null ? 'Créer un nouvel évènement' : 'Editer cet évènment')}
          </Accordion.Header>
          <Accordion.Body onClick={(e) => {
            e.stopPropagation();
          }}
          >
            {type === 'rental' && <RentalCreation rental={toEdit} />}
            {type === 'event' && <EventCreation event={toEdit} />}
          </Accordion.Body>
        </Accordion.Item>

      </Accordion>
    </div>
  );
}

FormAccordion.defaultProps = {
  toEdit: null,
};

export default FormAccordion;
