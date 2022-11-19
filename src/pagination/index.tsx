import * as React from "react";
import "./Pagination.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export function Pagination(props: PaginationProps) {
    const { currentPage, totalPages } = props;

    function populateItem(i: number) {
        return <a className={currentPage === i + 1 ? "selected" : ""}>{++i}</a>;
    }

    function renderNavigator() {
        if (totalPages < 10) {
            return [...Array(totalPages)].map((_, i) => {
                return populateItem(i);
            });
        }

        return [...Array(totalPages)].map((_, i) => {
            if (currentPage < 6 || currentPage > totalPages - 2) {
                if (i === 5) return "...";
                if (i > 5 && i < totalPages - 2) return null;
            } else {
                if (Math.abs(currentPage - (i + 1)) < 2 ||
                 i < 2 ||
                  i > totalPages - 3
                  ) {
                    return populateItem(i);
                }
                if (i === 3 || i === totalPages - 3) return "...";

                return null;
            }

            return populateItem(i);
        });
    }

    if (totalPages < 2) {
        return null;
    }

    return (
        <div className="pagination-container">
            {
                currentPage === 1 ?
                    <span className="prev-page disabled">&lt; prev</span> :
                    <a className="prev-page">&lt; prev</a>
            }
            {renderNavigator()}
            {
                currentPage === totalPages ?
                    <span className="next-page disabled">next &gt;</span> :
                    <a className="next-page">next &gt;</a>
            }
        </div>
    );
}