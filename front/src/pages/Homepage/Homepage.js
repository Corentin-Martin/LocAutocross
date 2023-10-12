import CardText from '../../components/CardText/CardText';
import WelcomeText from '../../components/CardText/WelcomeText/WelcomeText';
import NewsComponent from '../../components/NewsComponent/NewsComponent';
import GeneralLayout from '../../components/GeneralLayout/GeneralLayout';

function Homepage() {
  return (
    <GeneralLayout
      pageTitle="Accueil"
      description="Le site pour trouver une location de véhicule pour l'Autocross et le Sprint Car !"
      childComponent={(
        <>
          <CardText childComponent={<WelcomeText />} />

          <NewsComponent />
        </>
    )}
    />

  );
}

export default Homepage;
