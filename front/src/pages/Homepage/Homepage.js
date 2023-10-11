import './Homepage.scss';
import CardText from '../../components/CardText/CardText';
import WelcomeText from '../../components/CardText/WelcomeText/WelcomeText';
import NewsComponent from '../../components/NewsComponent/NewsComponent';

function Homepage() {
  return (
    <div className="Homepage">

      <CardText childComponent={<WelcomeText />} />

      <NewsComponent />
    </div>
  );
}

export default Homepage;
