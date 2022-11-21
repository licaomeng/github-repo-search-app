import * as React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { RepoList } from "../../components/repo-list";

const mockData_1 = [{
    full_name: "marcosesperon/Messi",
    html_url: "https://github.com/marcosesperon/Messi",
    description: "A simple message plugin for jQuery",
    updated_at: "2022-04-26T16:40:47Z",
    stargazers_count: 143,
    language: "CSS"
}];

const mockData_3 = [{
    full_name: "marcosesperon/Messi",
    html_url: "https://github.com/marcosesperon/Messi",
    description: "A simple message plugin for jQuery",
    updated_at: "2022-04-26T16:40:47Z",
    stargazers_count: 143,
    language: "CSS"
}, {
    full_name: "adityadroid/Messio",
    html_url: "https://github.com/adityadroid/Messio",
    description: "An open source messenger app built using flutter",
    updated_at: "2022-11-26T16:40:47Z",
    stargazers_count: 607,
    language: "Dart"
}, {
    full_name: "Soumyajit2825/MESSI_MANIA",
    html_url: "https://github.com/Soumyajit2825/MESSI_MANIA",
    description: "A simple fan made web-page of LIONEL MESSI",
    updated_at: "2022-09-26T16:40:47Z",
    stargazers_count: 8,
    language: "HTML"
}];

test("renders the repo-list component: no data", () => {
    const view = render(<RepoList data={[]}></RepoList>);

    expect(view).toMatchSnapshot();
});

test("renders the repo-list component: 1 item", () => {
    const view = render(<RepoList data={mockData_1}></RepoList>);

    expect(view).toMatchSnapshot();
});

test("renders the repo-list component: 3 item", () => {
    const view = render(<RepoList data={mockData_3}></RepoList>);

    expect(view).toMatchSnapshot();
});