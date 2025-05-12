import React from 'react';
//import CIcon from '@coreui/icons-react';
//import { cilArrowThickLeft, cilArrowThickRight, cilArrowThickToLeft, cilArrowThickToRight } from '@coreui/icons';
import { Pagination } from 'react-bootstrap';
import { ChevronDoubleLeft, ChevronDoubleRight, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import './Pagination.scss'

const CustomPagination = ({ currentPage, totalPages, goToPage }) => {
  const generatePaginationRange = () => {
    const pageNumbers = [];

    if (totalPages < 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = currentPage - 2;
      let endPage = currentPage + 2;
  
      if (startPage < 1) {
        startPage = 1;
        endPage = 5;
      }
  
      if (endPage > totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      }
  
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    return pageNumbers;
  };

  const renderPagination = () => {
    const pageNumbers = generatePaginationRange();

    return (
      <>
        {totalPages > 1 && (
          <Pagination>
            <div className='pagination-buttons'>
              <Pagination.Item onClick={() => goToPage(1)} disabled={currentPage === 1}>
                {/* <span aria-hidden="true">&laquo;</span> */}
                <ChevronDoubleLeft /> Primera
                {/* <CIcon icon={cilArrowThickToLeft}/> */}
              </Pagination.Item>
              <Pagination.Item onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}>
                <ChevronLeft /> Anterior
                {/*<CIcon icon={cilArrowThickLeft}/>
                <span aria-hidden="true">&lt;</span> */}
              </Pagination.Item>
            </div>
            <div className='pageContent'>

            {pageNumbers.map((page) => (
              <Pagination.Item
                key={page}
                onClick={() => goToPage(page)}
                className={page === currentPage ? 'active' : ''}
              >
                {page}
              </Pagination.Item>
            ))}
            </div>
            <div className='pagination-buttons'>
              <Pagination.Item onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= totalPages}>
              Siguiente<ChevronRight />
                {/* <span aria-hidden="true">&gt;</span> 
                <CIcon icon={cilArrowThickRight} />*/}
              </Pagination.Item>
              <Pagination.Item onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>
              Última<ChevronDoubleRight />
                {/* <span aria-hidden="true">&raquo;</span> 
                <CIcon icon={cilArrowThickToRight} />*/}
              </Pagination.Item>
            </div>
          </Pagination>
        )}
      </>
    );
  };
  
  return renderPagination();
};

export default CustomPagination;
