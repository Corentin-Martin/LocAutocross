import Footer from './Footer/Footer';
import Header from './Header/Header';
import './Skeleton.scss';

function Skeleton({ page }) {
  return (
    <div className="Skeleton">
      <Header />
      {page}
      <Footer />
    </div>
  );
}

export default Skeleton;
