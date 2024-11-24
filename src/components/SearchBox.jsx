import { useState } from "react";
import styles from "./SearchStyle.module.css";
import { useQuery } from "@tanstack/react-query";
// import api from "../configs/api";
import useDebounce from "../hooks/useDebounce";

function useProducts(page, search) {
  let url = `http://localhost:3000/products?page=${page}&limit=10`;
  if (!!search) {
    url += `&name=${search}`;
  }
  const queryKey = ["products", { page, search }];
  const queryFn = () => fetch(url).then((res) => res.json());

  return useQuery({ queryFn, queryKey });
}

function SearchBox() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const debouncedSearch = useDebounce(search, 200);
  const { isFetching, isError, data, isLoading, error } = useProducts(
    page,
    debouncedSearch
  );
  // console.log(data);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handlePageChange = (e) => {
    setPage(e.target.value);
  };

  const availablePages = [...Array(11).keys()];
  availablePages.shift();
  return (
    <>
      <div>
        <input
          type="text"
          onChange={handleSearchChange}
          placeholder="Search"
          value={search}
          className={styles.search}
        />
        {/* <select id="filter-page" value={page} onChange={handlePageChange}>
          {availablePages.map((pageNum) => (
            <option  value={pageNum}>{pageNum}</option>
          ))}
        </select> */}
      </div>

      {/* <div id="todos-container">
        {isFetching ? (
          <div className="loading">Loading...</div>
        ) : isError ? (
          <div className="error">Error: {error.message}</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Completed?</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td>{todo.completed ? "yes" : "no"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div> */}
    </>
  );
}

export default SearchBox;
