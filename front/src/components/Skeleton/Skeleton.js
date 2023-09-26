import Footer from './Footer/Footer';
import Header from './Header/Header';
import './Skeleton.scss';

function Skeleton({ page }) {
  return (
    <div className="Skeleton">
      <Header />
      <main className="Content">{page}</main>
      <Footer />
    </div>
  );
}

export default Skeleton;
