import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';
import CardComponent from '../../components/CardComponent/CardComponent';
import UserComponent from '../../components/CardComponent/UserComponent/UserComponent';
import AxiosPublic from '../../utils/AxiosPublic';
import { setElementToDisplay } from '../../actions/dashboard';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function User() {
  const { userId } = useParams();

  const elementToDisplay = useSelector((state) => state.dashboard.elementToDisplay);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (elementToDisplay === null) {
      AxiosPublic.get(`user/details/${userId}`)
        .then((response) => {
          dispatch(setElementToDisplay(response.data));

          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    else {
      setIsLoading(false);
    }
  }, [elementToDisplay]);

  if (elementToDisplay === null) {
    return <LoadingSpinner />;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <GeneralLayout
      title={elementToDisplay.user.pseudo}
      pageTitle={elementToDisplay.user.pseudo}
      childComponent={(
        <CardComponent
          childComponent={(
            <UserComponent
              user={elementToDisplay.user}
              comments={elementToDisplay.comments}
            />
)}
        />
)}
    />
  );
}

export default User;
