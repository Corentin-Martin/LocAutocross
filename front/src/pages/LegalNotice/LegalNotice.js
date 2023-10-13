import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';
import LegalText from '../../components/CardText/LegalText/LegalText';
import CardText from '../../components/CardText/CardText';

function LegalNotice() {
  return (
    <GeneralLayout
      title="Mentions légales"
      pageTitle="Mentions légales"
      description="Le site pour trouver une location de véhicule pour l'Autocross et le Sprint Car !"
      childComponent={(
        <CardText childComponent={<LegalText />} />
    )}
    />
  );
}

export default LegalNotice;
