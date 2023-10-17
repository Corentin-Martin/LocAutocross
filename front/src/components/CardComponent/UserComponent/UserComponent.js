import { Card, Row } from 'react-bootstrap';
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
        <InfosComponent title="Note" childComponent={<GlobalRating rating={user.rating} />} />
      </Row>
      {comments.length > 0 && <InfosComponent inColumn title="Avis" bgVariant="primary" childComponent={<CommentsComponent comments={comments} />} />}
      {user.propositions.length > 0 && <InfosComponent inColumn title="Ses locations à venir" childComponent={<FutureRentals rentals={user.propositions} />} />}

    </Card.Body>
  );
}

export default UserComponent;
