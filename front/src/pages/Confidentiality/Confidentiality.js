import CardText from '../../components/CardText/CardText';
import ConfidentialityText from '../../components/CardText/ConfidentialityText/ConfidentialityText';
import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';

function Confidentiality() {
  return (
    <GeneralLayout
      title="Politique de confidentialité"
      pageTitle="Politique de confidentialité"
      description="Le site pour trouver une location de véhicule pour l'Autocross et le Sprint Car !"
      childComponent={(
        <CardText childComponent={<ConfidentialityText />} />
    )}
    />
  );
}
export default Confidentiality;
