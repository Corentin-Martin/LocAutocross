import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';

function Error404() {
  return (
    <GeneralLayout title="Erreur 404" pageTitle="Erreur 404" childComponent={<ErrorComponent content="Cette page n'existe pas..." />} />
  );
}

export default Error404;
