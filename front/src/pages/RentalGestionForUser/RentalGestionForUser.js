import { useEffect, useState } from 'react';
import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';
import RentalsTracking from '../../components/RentalsTracking/RentalsTracking';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import AxiosPrivate from '../../utils/AxiosPrivate';

function RentalGestionForUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [myProjects, setMyProjects] = useState([]);

  useEffect(() => {
    AxiosPrivate.get('rentals?project')
      .then((response) => {
        setMyProjects(response.data);
        setIsLoading(false);
      }).catch((error) => {
        console.error(error);
      });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <GeneralLayout
      title="Mes projets locations"
      pageTitle="Mes projets locations"
      childComponent={<RentalsTracking rentals={myProjects} />}
    />
  );
}

export default RentalGestionForUser;
