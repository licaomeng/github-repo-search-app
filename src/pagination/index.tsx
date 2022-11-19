import * as React from "react";
import styles from "./Pagination.module.css";
import cx from "classnames";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export function Pagination(props: PaginationProps) {
    const { currentPage, totalPages } = props;

    function populateItem(i: number) {
        return <a className={currentPage === i + 1 ? cx(styles.btn, styles.selected) : styles.btn}>{++i}</a>;
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
        <div className={styles.paginationContainer}>
            {
                currentPage === 1 ?
                    <span className={cx(styles.btn, styles.prevPage, styles.disabled)}>&lt; prev</span> :
                    <a className={cx(styles.btn, styles.prevPage)}>&lt; prev</a>
            }
            {renderNavigator()}
            {
                currentPage === totalPages ?
                    <span className={cx(styles.btn, styles.nextPage, styles.disabled)}>next &gt;</span> :
                    <a className={cx(styles.btn, styles.nextPage)}>next &gt;</a>
            }
        </div>
    );
}