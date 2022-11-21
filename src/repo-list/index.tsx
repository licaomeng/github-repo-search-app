import * as React from "react";
import { stringToColor } from "../utils";
import { Star, Repo } from "../assets";
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

export function RepoList({ data }: ListProps) {
    return <ul className={styles.repoList}>{
        data.map((item, index) =>
            <li key={`repo-item-${index}`} className={styles.repoListItem}>
                <p><Repo /><a href={item.html_url}>{item.full_name}</a></p>
                <p className={styles.desc}>{item.description}</p>
                <div className={styles.infoBar}>
                    <p><Star />{item.stargazers_count}</p>
                    {
                        item.language && <p>
                            <span
                                className={styles.repoLanguageColor}
                                style={{ backgroundColor: stringToColor(item.language) }}
                            ></span>
                            {item.language}
                        </p>
                    }
                    <p>Updated on {new Date(item.updated_at)?.toDateString()}</p>
                </div>
            </li>
        )
    }</ul>;
}