import * as React from "react";
import styles from "./Pagination.module.css";
import cx from "classnames";
import { useSearchParams } from "react-router-dom";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
}

export function Pagination(props: PaginationProps) {
    const { currentPage, totalPages } = props;
    const [searchParams, setSearchParams] = useSearchParams();

    function populateItem(i: number) {
        return <a
            aria-label={`Page ${i + 1}`}
            key={`nav-item-${i}`}
            onClick={handleClick(i + 1)}
            className={currentPage === i + 1 ? cx(styles.btn, styles.selected) : styles.btn}
        >{++i}</a>;
    }

    const handleClick = (index: number) => () => {
        searchParams.set("p", String(index));
        setSearchParams(searchParams);
    };

    function navBtn(isNext: boolean, isDisabled: boolean) {
        const text = isNext ? "Next >" : "< Prev";
        const style = isNext ? styles.nextPage : styles.prevPage;

        if (isDisabled) {
            return <span className={cx(styles.btn, style, styles.disabled)}>{text}</span>;
        }

        return <a onClick={handleClick(isNext ? currentPage + 1 : currentPage - 1)} className={cx(styles.btn, style)}>{text}</a>;
    }

    function renderNav() {
        if (totalPages < 10) {
            // no ...
            return [...Array(totalPages)].map((_, i) => populateItem(i));
        }

        if (currentPage < 6 || currentPage > totalPages - 2) {
            // like 1 2 3 4 ⑤ ... 14 15
            return [...Array(totalPages)].map((_, i) => {
                if (i === 5) return "...";
                if (i > 5 && i < totalPages - 2) return null;

                return populateItem(i);
            });
        }

        // like 1 2 ... 6 ⑦ 8 ... 14 15
        return [...Array(totalPages)].map((_, i) => {
            const isNav = Math.abs(currentPage - (i + 1)) < 2 || i < 2 || i > totalPages - 3;
            const isEllipse = ((i === 3) || (i === totalPages - 3));

            if (isNav) return populateItem(i);
            if (isEllipse) return "...";

            return null;
        });
    }

    if (totalPages < 2) {
        return null;
    }

    return (
        <div className={styles.paginationContainer}>
            {currentPage === 1 ? navBtn(false, true) : navBtn(false, false)}
            <div className={styles.nav}>
                {renderNav()}
            </div>
            {currentPage === totalPages ? navBtn(true, true) : navBtn(true, false)}
        </div>
    );
}