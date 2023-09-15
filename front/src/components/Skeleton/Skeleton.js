import Footer from './Footer/Footer';
import Header from './Header/Header';
import './Skeleton.scss';

function Skeleton({ page }) {
  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
}

export default Skeleton;
