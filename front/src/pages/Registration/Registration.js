import RegisterForm from '../../components/RegisterForm/RegisterForm';
import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';

function Registration() {
  return (
    <GeneralLayout
      title="Inscription"
      pageTitle="Inscription"
      description="Inscrivez-vous et trouvez la location idéale pour rouler sur les piste de France ou mettez votre véhicule à louer."
      childComponent={<RegisterForm />}
    />

  );
}

export default Registration;
