import { useEffect, useState } from "react";
import { Octokit } from "@octokit/core";
import { useSearchParams } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { Pagination } from "./pagination";
import { RepoList } from "./repo-list";
import { Header } from "./header";
import { SearchBox } from "./search-box";
import { throttle, ErrorBoundary } from "./utils";
import { Search } from "./assets";
import "./App.css";

const octokit = new Octokit();
const PER_PAGE = 5;

const initBanner = (
  <h2><Search />Search more than <strong>358M</strong> repositories</h2>
);

const fetchThrottle = throttle(octokit.request, 2000);

function App() {
  const [repoList, setRepoList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState("light");

  const onSelectTheme = (theme: "dark" | "light") => {
    setTheme(theme);
  };

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
    // Add listener to update styles
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => onSelectTheme(e.matches ? "dark" : "light"));

    // Setup dark/light mode for the first time
    onSelectTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

    // Remove listener
    return () => {
      window.clearInterval(intervalId);
      window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", () => {
      });
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
    <div className="github-repo-search-page" data-theme={theme}>
      <LoadingBar
        height={3}
        color="#0969da"
        progress={progress}
      />
      <Header><SearchBox isInHeader={true}></SearchBox></Header>
      {
        query === "" ? <>
          <span className="init-banner">{initBanner}</span>
          <span id="init-search-box">
            <ErrorBoundary>
              <SearchBox isInHeader={false}></SearchBox>
            </ErrorBoundary>
          </span>
        </> : <>
          <span id="search-box">
            <ErrorBoundary>
              <SearchBox isInHeader={false}></SearchBox>
            </ErrorBoundary>
          </span>
          <div className="total-count">{totalCount.toLocaleString()} available repository results</div>
          <ErrorBoundary>
            <RepoList data={repoList}></RepoList>
          </ErrorBoundary>
          <ErrorBoundary>
            <Pagination currentPage={currentPage} totalPages={totalPages}></Pagination>
          </ErrorBoundary>
        </>
      }
    </div>
  );
}

export default App;
