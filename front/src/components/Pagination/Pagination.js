import { Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

function Pagination({ totalPages, sendPageToParent }) {
  const handlePageClick = (data) => {
    sendPageToParent(data.selected + 1);
  };

  return (
    <Row style={{ minWidth: '100%' }} className="d-flex justify-content-center mt-2">

      <ReactPaginate
        className="d-flex justify-content-around"
        pageCount={totalPages}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        previousLabel="<"
        nextLabel=">"
        onPageChange={handlePageClick}
      />
    </Row>

  );
}

export default Pagination;
