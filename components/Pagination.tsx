import { JobsContext } from "@/context/JobsContext";
import React, { useContext } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  pagesCount?: number;
  count?: number;
}

const Pagination = ({ pagesCount = 1, count = 1 }: PaginationProps) => {
  const { page, setPage } = useContext(JobsContext);

  const showNextButton = page !== pagesCount;
  const showPrevButton = page !== 1;

  const handlePageClick = (e: { selected: number }) => {
    setPage(e.selected + 1);
  };

  const startIndex = (page - 1) * 12 + 1;
  const endIndex = Math.min(startIndex + 12 - 1, count);

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {startIndex}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {endIndex}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {count}
        </span>{" "}
        Entries
      </span>
      <div className="inline-flex mt-2 xs:mt-0 rounded-lg overflow-hidden border border-gray-300 dark:border-zinc-700  ">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 text-sm font-medium inline-flex items-center 
          border-r
          border-gray-300 dark:border-zinc-700
          disabled:pointer-events-none
          text-gray-600 dark:text-gray-400
          bg-gray-50 dark:bg-zinc-800
          hover:bg-gray-300 dark:hover:bg-zinc-700
          hover:text-black dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Prev
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={endIndex === count}
          className="px-4 py-2 text-sm font-medium inline-flex items-center 
          border-l
          border-gray-300 dark:border-zinc-700
          disabled:pointer-events-none
          text-gray-600 dark:text-gray-400
          bg-gray-50 dark:bg-zinc-800
          hover:bg-gray-300 dark:hover:bg-zinc-700
          hover:text-black dark:hover:text-white"
        >
          Next
          <svg
            aria-hidden="true"
            className="w-5 h-5 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
