import { useEffect, useState } from "react";
import { Pagination } from "./pagination";
import { RepoList } from "./repo-list";
import { Header } from "./header";
import { SearchBox } from "./search-box";
import { Octokit } from "@octokit/core";
import { useSearchParams } from "react-router-dom";
import { throttle } from "./utils";
import { Search } from "./assets";
import LoadingBar from "react-top-loading-bar";
import "./App.css";

const octokit = new Octokit();
const PER_PAGE = 5;

const initBanner = (
  <h2>
    <Search />Search more than <strong>358M</strong> repositories
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
