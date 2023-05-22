'use client';

import React from 'react';
import ReactPaginate from 'react-paginate';

interface IPagination {
  pageCount: number;
}

const Pagination: React.FC<IPagination> = ({ pageCount }) => {
  return <ReactPaginate pageCount={pageCount} />;
};

export default Pagination;
