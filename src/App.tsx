import { useEffect, useState } from "react";
import { Pagination } from "./pagination";
import { RepoList } from "./repo-list";
import { Header } from "./header";
import { SearchBox } from "./search-box";
import { Octokit } from "@octokit/core";
import { useSearchParams } from "react-router-dom";
import { throttle } from "./utils";
import LoadingBar from "react-top-loading-bar";
import "./App.css";

const octokit = new Octokit();
const PER_PAGE = 5;

const initBanner = (
  <h2>
    <svg className="octicon" aria-hidden="true" height="24" viewBox="0 0 24 24" version="1.1" width="24" data-view-component="true">
      <path fillRule="evenodd" d="M10.25 2a8.25 8.25 0 105.28 14.59l5.69 5.69a.75.75 0 101.06-1.06l-5.69-5.69A8.25 8.25 0 0010.25 2zM3.5 10.25a6.75 6.75 0 1113.5 0 6.75 6.75 0 01-13.5 0z"></path>
    </svg>
    Search more than <strong>358M</strong> repositories
  </h2>
);

const fetchThrottle = throttle(octokit.request, 2000);

function App() {
  const [repoList, setRepoList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [progress, setProgress] = useState(0);
  let intervalId = 0;

  async function fetchRepo(q = "", page = 1, per_page = PER_PAGE) {
    if (q === "") return;

    setProgress(0);

    intervalId = window.setInterval(() => {
      setProgress((progress) => progress + 10);
      window.clearInterval(intervalId);
    }, 500);

    const { data } = await fetchThrottle("GET /search/repositories?q={q}&per_page={per_page}", {
      q,
      page,
      per_page
    });

    setProgress(100);
    setRepoList(data.items);
    setTotalCount(data.total_count);
  }

  useEffect(() => {
    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  // pass searchParams as a dependency into the useEffect
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const page = Number(searchParams.get("p") || 1);

    setQuery(q || "");
    setCurrentPage(Number(page) || 1);

    fetchRepo(q, page);

  }, [searchParams]);

  // Only the first 1000 search results are available
  const totalPages = Math.min(Math.ceil(totalCount / PER_PAGE), 1000 / PER_PAGE);

  return (
    <>
      <LoadingBar
        height={3}
        color="#0969da"
        progress={progress}
      />
      <Header><SearchBox isInHeader={true}></SearchBox></Header>
      {
        query === "" ? <>
          <span className="init-banner">{initBanner}</span>
          <span id="init-search-box"><SearchBox isInHeader={false}></SearchBox></span>
        </> : <>
          <span id="search-box"><SearchBox isInHeader={false}></SearchBox></span>
          <div className="total-count">{totalCount.toLocaleString()} available repository results</div>
          <RepoList data={repoList}></RepoList>
          <Pagination currentPage={currentPage} totalPages={totalPages}></Pagination>
        </>
      }
    </>
  );
}

export default App;
