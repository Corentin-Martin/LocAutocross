import { Col, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import AxiosPublic from '../../utils/AxiosPublic';
import Pagination from '../Pagination/Pagination';
import RentalExtract from '../RentalExtract/RentalExtract';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function AllRentals() {
  const [rentals, setRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const sendPageToParent = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const query = currentPage === 1 ? 'rentals' : `rentals?page=${currentPage}`;

    AxiosPublic.get(query)
      .then((response) => {
        setRentals(response.data.rentals);
        setTotalPages(response.data.totalPages);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentPage]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoading && rentals.length === 0) {
    return <div className="alert alert-danger">Rien à afficher pour le moment</div>;
  }

  return (
    <>
      <Row>
        {rentals.map((rental) => (
          <Col key={rental.id} xs={12} md={4} lg={3} className="mb-2">
            <RentalExtract rental={rental} />
          </Col>
        ))}
      </Row>
      <Pagination totalPages={totalPages} sendPageToParent={sendPageToParent} />
    </>
  );
}

export default AllRentals;
