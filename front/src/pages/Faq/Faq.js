import CardText from '../../components/CardText/CardText';
import FAQText from '../../components/CardText/FAQText/FAQText';
import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';

function Faq() {
  return (
    <GeneralLayout
      title="Foire aux questions"
      pageTitle="Foire aux questions"
      description="Le site pour trouver une location de véhicule pour l'Autocross et le Sprint Car !"
      childComponent={<CardText allWidth childComponent={<FAQText />} />}
    />
  );
}

export default Faq;
