import React, { useRef, useEffect } from "react";
import { Octicon } from "../assets";
import styles from "./Header.module.css";

interface HeaderProps {
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
            <a ref={ref} className={styles.headerLink} href="/">
                <Octicon />
                <span className={styles.searchBox}>{props.children}</span>
            </a>
        </div>
    );
}