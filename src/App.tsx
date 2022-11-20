import { useEffect, useState } from "react";
import { Pagination } from "./pagination";
import { RepoList } from "./repo-list";
import { Header } from "./header";
import { SearchBox } from "./search-box";
import { Octokit } from "@octokit/core";
import { useSearchParams } from "react-router-dom";
import { throttle } from "./utils";
import "./App.css";

const octokit = new Octokit();
const PER_PAGE = 5;

function App() {
  const [repoList, setRepoList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [_, setQuery] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const fetchThrottle = throttle(octokit.request, 1000);

  async function fetchRepo(q = "", page = 1, per_page = PER_PAGE) {
    if (q === "") {
      return;
    }
    const { data } = await fetchThrottle("GET /search/repositories?q={q}&per_page={per_page}", {
      q,
      page,
      per_page
    });

    console.log(data);

    setRepoList((list) => data.items);
    setTotalCount(data.total_count);
  }

  useEffect(() => {
    fetchRepo();
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
      <Header><SearchBox isInHeader={true}></SearchBox></Header>
      <span id="search-box"><SearchBox isInHeader={false}></SearchBox></span>
      <div className="total-count">{totalCount.toLocaleString()} available repository results</div>
      <RepoList data={repoList}></RepoList>
      <Pagination currentPage={currentPage} totalPages={totalPages}></Pagination>
    </>
  );
}

export default App;
