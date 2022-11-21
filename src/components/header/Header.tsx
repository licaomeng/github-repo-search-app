import React, { useRef, useEffect } from "react";
import { ReactComponent as Octicon } from "../icons/octicon.svg";
import styles from "./Header.module.css";

type HeaderProps = {
    children?: any;
}

export function Header(props: HeaderProps) {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;

        const handleClick = (e: any) => {
            if (e.target.tagName === "INPUT") {
                e.preventDefault();
            }
        };

        if (element) {
            (element as HTMLElement)?.addEventListener("click", handleClick);
        }

        return () => {
            if (element) {
                (element as HTMLElement)?.removeEventListener("click", handleClick);
            }
        };
    }, []);

    return (
        <div className={styles.header}>
            <a
                ref={ref}
                target="_self"
                aria-label="Homepage"
                className={styles.headerLink}
                href={process.env.NODE_ENV === "production" ? "/github-repo-search-app" : "/"}>
                <Octicon />
            </a>
            <span className={styles.searchBox}>{props.children}</span>
        </div>
    );
}