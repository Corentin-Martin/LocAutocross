import { Card, Row } from 'react-bootstrap';
import moment from 'moment';
import InfosComponent from '../../InfosComponent/InfosComponent';
import UserFiche from './UserFiche/UserFiche';
import FutureRentals from './FutureRentals/FutureRentals';
import GlobalRating from './GlobalRating/GlobalRating';
import CommentsComponent from './CommentsComponent/CommentsComponent';

function UserComponent({ user, comments }) {
  return (
    <Card.Body>
      <Row className="mt-3 d-flex justify-content-between">
        <InfosComponent title="Fiche" childComponent={<UserFiche user={user} />} />
        <InfosComponent title="Note" childComponent={<GlobalRating rating={user.rating} number={comments.length} />} />
      </Row>
      {comments.length > 0 && (
      <InfosComponent
        inColumn
        title="Avis"
        bgVariant="primary"
        childComponent={<CommentsComponent comments={comments} />}
      />
      )}
      {user.propositions.length > 0 && (
      <InfosComponent
        inColumn
        title="Ses locations à venir"
        bgVariant="tertiary"
        childComponent={(
          <FutureRentals
            rentals={user.propositions.filter(
              (rent) => moment(rent.event.start) > moment()
              && rent.event.isCancelled === false,
            )}
          />
      )}
      />
      )}

    </Card.Body>
  );
}

export default UserComponent;
