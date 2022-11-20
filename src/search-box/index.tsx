import { useState } from "react";
import styles from "./SearchBox.module.css";
import { useSearchParams } from "react-router-dom";

export function SearchBox() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [text, setText] = useState(searchParams.get("q") || "");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setText(e.target.value);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        searchParams.set("q", text);
        setSearchParams(searchParams);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                aria-label="Search GitHub"
                autoCapitalize="off"
                autoComplete="off"
                className={styles.searchBox}
                name="q"
                maxLength={256} 
                placeholder="Search GitHub Repo"
                spellCheck="false"
                type="text"
                value={text}
                onChange={handleChange}
            ></input>
            <button className={styles.btn} type="submit">Search</button>
        </form>
    );
}