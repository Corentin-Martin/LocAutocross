import AboutText from '../../components/CardText/AboutText/AboutText';
import CardText from '../../components/CardText/CardText';
import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';

function About() {
  return (
    <GeneralLayout
      title="A propos"
      pageTitle="A propos"
      description="Le site pour trouver une location de véhicule pour l'Autocross et le Sprint Car !"
      childComponent={(
        <CardText childComponent={<AboutText />} />
    )}
    />
  );
}

export default About;
