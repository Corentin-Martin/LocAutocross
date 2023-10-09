import { useState } from 'react';
import { Accordion } from 'react-bootstrap';

function FormAccordion({ childComponent, message }) {
  const [openItem, setOpenItem] = useState(null);

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

export default FormAccordion;
