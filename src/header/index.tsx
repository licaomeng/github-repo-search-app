import React, { useRef, useEffect } from "react";
import { Octicon } from "../assets";
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
            <a aria-label="Homepage" ref={ref} className={styles.headerLink} href="/">
                <Octicon />
            </a>
            <span className={styles.searchBox}>{props.children}</span>
        </div>
    );
}