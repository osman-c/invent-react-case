import { FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const OLDEST_MOVIE_YEAR = 1888;

export default function SearchForm() {
  const [queryParams] = useSearchParams();

  const currentYear = new Date().getFullYear();
  const years = new Array(currentYear - OLDEST_MOVIE_YEAR)
    .fill("")
    .map((_v, i) => (currentYear - i).toString());

  const navigator = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get("title");
    const type = formData.get("type");
    const year = formData.get("year");

    const params = new URLSearchParams();

    if (title) params.append("title", title.toString());
    if (type) params.append("type", type.toString());
    if (year) params.append("year", year.toString());

    navigator(`/?${params.toString()}`);
  }

  return (
    <form className="app-form" onSubmit={(e) => handleSubmit(e)}>
      <label className="label">
        Title:
        <input
          name="title"
          placeholder="Pokemon"
          defaultValue={queryParams.get("title") || undefined}
          className="input"
        />
      </label>
      <label className="label">
        Year:
        <select
          name="year"
          defaultValue={queryParams.get("year") || undefined}
          className="input"
        >
          <option value="">Any year</option>
          {years.map((y) => (
            <option value={y} key={y}>
              {y}
            </option>
          ))}
        </select>
      </label>
      <label className="label">
        Type:
        <select
          name="type"
          defaultValue={queryParams.get("type") || undefined}
          className="input"
        >
          <option value="">Any type</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
      </label>
      <button type="submit" className="button">
        Search
      </button>
    </form>
  );
}
