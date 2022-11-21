import * as React from "react";
import { useState } from "react";
import styles from "./SearchBox.module.css";
import { useSearchParams } from "react-router-dom";
import cx from "classnames";

type SearchBoxProps = {
    isInHeader: boolean;
}

export function SearchBox(props: SearchBoxProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [text, setText] = useState(searchParams.get("q") || "");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.stopPropagation();
        setText(e.target.value);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        searchParams.set("q", text);
        setSearchParams(searchParams);
    }

    return (
        <form
            data-testid="search-box-form"
            className={cx(styles.form)}
            onSubmit={handleSubmit}>
            <input
                aria-label="Search GitHub Repo"
                autoCapitalize="off"
                autoComplete="off"
                className={styles.searchBox}
                name="q"
                maxLength={256}
                placeholder="Search GitHub Repo"
                spellCheck="false"
                type="text"
                value={text}
                onClick={(e) => e.stopPropagation()}
                onChange={handleChange}
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