import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { SearchResponseTrue } from "./api/omdb";
import { capitalize } from "lodash";
import { useSearchParams } from "react-router-dom";
import { FormEvent } from "react";

export default function SearchTable() {
  const data = useLoaderData() as SearchResponseTrue;
  const [queryParams] = useSearchParams();

  const navigator = useNavigate();

  const page = getPage();

  const maxPages = getMaxPages();

  // page variable was acting weird (incrementing by 1 more for a split second before
  // going back to intended value when i was using queryParams) so i did this
  function getPage() {
    const p = window.location.href.split("page=");
    if (p.length < 2) {
      return "1";
    }

    const v = p[1].split("&");

    if (v.length < 2) {
      return p[1];
    }

    return v[0];
  }

  function getMaxPages() {
    return (+data.totalResults / 10).toFixed(0);
  }

  function getPreviousPageURL() {
    const newParams = queryParams;
    newParams.set("page", (+page - 1).toString());
    return `/?${newParams.toString()}`;
  }

  function getNextPageURL() {
    const newParams = queryParams;
    newParams.set("page", (+page + 1).toString());
    return `/?${newParams.toString()}`;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newParams = queryParams;

    const page = formData.get("page");

    newParams.set("page", page?.toString() || "1");

    navigator(`/?${newParams.toString()}`);
  }

  return (
    <>
      <div className="table-wrapper">
        <table className="movie-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Year</th>
              <th>IMDB ID</th>
            </tr>
          </thead>
          <tbody>
            {data.Search.map((movie) => (
              <tr key={movie.imdbID}>
                <td>
                  <Link to={`/entry/${movie.imdbID}`}>{movie.Title}</Link>
                </td>
                <td>{capitalize(movie.Type)}</td>
                <td>{movie.Year}</td>
                <td>{movie.imdbID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card">
        <div className="pagination">
          <div className="prev">
            {page !== "1" && (
              <Link to={getPreviousPageURL()} className="button">
                Previous page
              </Link>
            )}
          </div>
          <div className="child">
            <div>
              Page: <span className="bold">{page} </span>of {maxPages}
            </div>
            <form onSubmit={handleSubmit} className="form">
              <label className="label small">
                Go to page
                <input
                  key={page}
                  className="input small"
                  name="page"
                  defaultValue={page}
                  type="number"
                  min={1}
                  max={maxPages}
                />
              </label>
              <button type="submit" className="button small">
                Go
              </button>
            </form>
          </div>
          <div className="next">
            {page !== maxPages && (
              <Link to={getNextPageURL()} className="button">
                Next page
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
