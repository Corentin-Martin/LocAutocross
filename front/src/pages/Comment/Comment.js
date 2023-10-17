import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';
import CommentForm from '../../components/CommentForm/CommentForm';
import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import AxiosPublic from '../../utils/AxiosPublic';

function Comment() {
  const { rentalId } = useParams();
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(true);
  const [wrong, setWrong] = useState(false);
  const [commentExist, setCommentExist] = useState(false);

  useEffect(() => {
    AxiosPublic.get(`rentals/${rentalId}`)
      .then((response) => {
        if (moment(response.data.event.end) > moment()) {
          setWrong(true);
        }

        if (response.data.comment !== null) {
          setCommentExist(true);
        }

        if (response.data.tenantUser.id !== user.id) {
          setWrong(true);
        }

        setIsLoading(false);
      }).catch((error) => {
        console.error(error);
      });
  }, []);

  if (wrong) {
    return <div className="alert alert-danger text-center">Accès interdit</div>;
  }

  if (commentExist) {
    return <div className="alert alert-danger text-center">Un commentaire a déjà été laissé pour cette location.</div>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <GeneralLayout
      title="Mon commentaire"
      pageTitle="Mon commentaire"
      childComponent={<CommentForm />}
    />
  );
}

export default Comment;
