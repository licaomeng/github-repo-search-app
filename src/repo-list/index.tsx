import * as React from "react";
import styles from "./RepoList.module.css";

type dataList = {
    name?: string
    full_name: string
    html_url: string
    description: string
    updated_at: string
    stargazers_count: number
    language: string
}[];

interface ListProps {
    data: dataList
}

function stringToColor(str: string) {
    let hash = 0;
    let color = "#";

    str = String(str);

    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;

        color += ("00" + value.toString(16)).substr(-2);
    }

    return color;
}

export function RepoList({ data }: ListProps) {
    return <ul className={styles.repoList}>{
        data.map(item =>
            <li className={styles.repoListItem}>
                <p>
                    <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
                        <path fill-rule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
                    </svg>
                    <a href={item.html_url}>{item.full_name}</a>
                </p>
                <p className={styles.desc}>{item.description}</p>
                <div className={styles.infoBar}>
                    <p>
                        <svg aria-label="star" role="img" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true">
                            <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
                        </svg>
                        {item.stargazers_count}
                    </p>
                    <p>
                        <span className={styles.repoLanguageColor} style={{ backgroundColor: stringToColor(item.language) }}></span>
                        {item.language}
                    </p>
                    <p>Updated on {new Date(item.updated_at)?.toDateString()}</p>
                </div>
            </li>
        )
    }</ul>;
}