import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
import "./pagination.css";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    totalPageCount,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    totalPageCount,
  });

  return (
    <>
    <ul
      className={classnames("pagination-container", { [className]: className })}
    >
      {paginationRange.map((pageNumber, i) => {
        if (pageNumber?.label === DOTS) {
          return (
            <li
              key={i}
              className="pagination-item dots"
              onClick={() => {
                onPageChange(pageNumber.page);
              }}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={i}
            className={classnames("pagination-item", "d-button", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => {
              onPageChange(pageNumber)}}
          >
            {pageNumber}
          </li>
        );
      })}
    </ul>
    </>
  );
};

export default Pagination;