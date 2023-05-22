'use client';

import React from 'react';
import ReactPaginate from 'react-paginate';

interface IPagination {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  forcePage: number;
}

const Pagination: React.FC<IPagination> = ({
  pageCount,
  onPageChange,
  forcePage,
}) => {
  return (
    <ReactPaginate
      forcePage={forcePage}
      onPageChange={onPageChange}
      previousLabel="Previous"
      nextLabel="Next"
      breakLabel="..."
      pageCount={pageCount}
      previousClassName="px-2 py-1 mx-1 rounded-md bg-yellow-300 text-black/[0.8]"
      nextClassName="px-2 py-1 mx-1 rounded-md bg-yellow-300 text-black/[0.8]"
      previousLinkClassName="cursor-pointer"
      nextLinkClassName="cursor-pointer"
      breakClassName="px-2 py-1 mx-1 text-black/[0.8]"
      breakLinkClassName="cursor-pointer"
      disabledClassName="cursor-not-allowed opacity-50"
      containerClassName="flex flex-wrap justify-center my-4"
      pageClassName="px-2 py-1 mx-1 rounded-md bg-yellow-300 text-black/[0.8]"
      pageLinkClassName="cursor-pointer"
      activeClassName="bg-yellow-500 text-white"
    />
  );
};

export default Pagination;
