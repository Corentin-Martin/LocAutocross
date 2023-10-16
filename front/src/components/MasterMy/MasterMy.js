import moment from 'moment';
import { Accordion } from 'react-bootstrap';
import React from 'react';

function MasterMy({ myThings, type, childComponent }) {
  return (

    <div className="col-12">
      {(myThings[0].length > 0 || myThings[1].length > 0)
        ? (
          <Accordion defaultActiveKey="0" className="col-12">
            {myThings.map((pastOrFuture) => (
              (pastOrFuture.length > 0

              && (
              <Accordion.Item key={pastOrFuture[0].id} eventKey={pastOrFuture[0].id}>
                <Accordion.Header>{moment(type === 'rental'
                  ? pastOrFuture[0].event.start : pastOrFuture[0].start) < moment() ? `${pastOrFuture.length > 1 ? 'Mes ' : 'Mon '}évènement${pastOrFuture.length > 1 ? 's' : ''} passé${pastOrFuture.length > 1 ? 's' : ''}` : `${pastOrFuture.length > 1 ? 'Mes ' : 'Mon '}évènement${pastOrFuture.length > 1 ? 's' : ''} à venir`}
                </Accordion.Header>
                <Accordion.Body>

                  {React.cloneElement(childComponent, { pastOrFuture: pastOrFuture })}

                </Accordion.Body>
              </Accordion.Item>
              )
              )
            ))}
          </Accordion>
        )
        : <p className="text-center">Vous n'avez encore jamais {type === 'rental' ? 'proposé de location' : "d'évènement"}.</p>}
    </div>

  );
}

export default MasterMy;
