import * as React from "react";
import { useRef } from "react";
import styles from "./SearchBox.module.css";
import { useSearchParams } from "react-router-dom";
import cx from "classnames";

type SearchBoxProps = {
    isInHeader: boolean;
}

export function SearchBox(props: SearchBoxProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        searchParams.set("q", (inputRef as any).current.value);
        setSearchParams(searchParams);
    }

    return (
        <form
            data-testid="search-box-form"
            className={cx(styles.form)}
            onSubmit={handleSubmit}>
            <input
                ref={inputRef}
                aria-label="Search GitHub Repo"
                autoCapitalize="off"
                autoComplete="off"
                className={styles.searchBox}
                name="q"
                maxLength={256}
                placeholder="Search GitHub Repo"
                spellCheck="false"
                type="text"
                defaultValue={searchParams.get("q") || ""}
                onClick={(e) => e.stopPropagation()}
            />
            {
                !props.isInHeader && <button
                    type="submit"
                    className={styles.btn}
                    data-testid="search-box-submit-btn"
                    onClick={handleSubmit}
                >Search</button>
            }
        </form>
    );
}