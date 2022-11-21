import { useEffect, useState, useMemo } from "react";
import { Octokit } from "@octokit/core";
import { retry } from "@octokit/plugin-retry";
import { useSearchParams } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import { Pagination } from "./components/pagination";
import { RepoList } from "./components/repo-list";
import { Header } from "./components/header";
import { SearchBox } from "./components/search-box";
import { throttle, ErrorBoundary, progressWrapper } from "./utils";
import { ReactComponent as Search } from "./components/icons/search.svg";
import "./App.css";

const MyOctokit = Octokit.plugin(retry);
const octokit = new MyOctokit({
  // API rate limit exceeded 
  // Authenticated requests get a higher rate limit.
  retry: { doNotRetry: [403] },
  request: { retries: 1 }
});
const PER_PAGE = 5;
const FETCH_REPO_URL = "GET /search/repositories?q={q}&per_page={per_page}";

const darkMatchMedia = window.matchMedia("(prefers-color-scheme: dark)");

const initBanner = (
  <h2><Search />Search more than <strong>358M</strong> repositories</h2>
);

const fetchThrottle = throttle(octokit.request, 2000);

async function fetchRepo(q = "", page = 1, per_page = PER_PAGE) {
  if (q === "") return;

  const { data } = await fetchThrottle(FETCH_REPO_URL, { q, page, per_page }) as any;

  return data;
}

function App() {
  const [repoList, setRepoList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState("light");

  function onSelectTheme(theme: "dark" | "light") {
    setTheme(theme);
  }

  const fetch = useMemo(() => progressWrapper(fetchRepo, setProgress), []);

  // pass searchParams as a dependency into the useEffect
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const page = Number(searchParams.get("p") || 1);

    setQuery(q);
    setCurrentPage(page || 1);

    fetch(q, page).then(res => {
      if (res) {
        setRepoList(res.items);
        setTotalCount(res.total_count);
      }
    });
  }, [searchParams]);

  useEffect(() => {
    // Add listener to update styles
    darkMatchMedia.addEventListener("change", e => onSelectTheme(e.matches ? "dark" : "light"));

    // Setup dark/light mode for the first time
    onSelectTheme(darkMatchMedia.matches ? "dark" : "light");

    // Remove listener
    return () => {
      // window.clearInterval(intervalId);
      darkMatchMedia.removeEventListener("change", () => { });
    };
  }, []);

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
