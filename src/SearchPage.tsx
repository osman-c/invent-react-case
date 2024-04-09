import { useLoaderData } from "react-router-dom";
import SearchForm from "./SearchForm";
import { Search } from "./api/omdb";
import SearchTable from "./SearchTable";

function SearchPage() {
  const data = useLoaderData() as Search;
  console.log(data);

  return (
    <div className="app-wrapper">
      <div className="search-page">
        <h1>Search</h1>
        <SearchForm />
        <div className="content">
          {data.Response === "False" ? <p>{data.Error}</p> : <SearchTable />}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
