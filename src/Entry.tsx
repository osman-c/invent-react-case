import { useLoaderData } from "react-router-dom";
import { Movie } from "./api/omdb";
import { capitalize } from "lodash";

export default function Entry() {
  const data = useLoaderData() as Movie;

  function parseGenres() {
    return data.Genre.split(", ");
  }

  return (
    <div className="entry">
      <div className="title">
        <h1>{data.Title}</h1>
        <div className="summary divide">
          <span>{data.Released}</span>
          <span>{capitalize(data.Type)}</span>
          {data.Runtime !== "N/A" && <span>{data.Runtime}</span>}
        </div>
      </div>
      <div className="card">
        <div className="content">
          <div className="poster">
            <div className="image-wrapper">
              <img src={data.Poster} width={"100%"} height={"100%"} />
            </div>
            <h3>IMDB Ratings</h3>
            <div className="ratings">
              <span>
                <span className="bold">{data.imdbRating}</span> / 10
              </span>
              <span>{data.imdbVotes} votes</span>
            </div>
          </div>
          <div className="details">
            <div className="genres">
              {parseGenres().map((genre) => (
                <div key={genre}>{genre}</div>
              ))}
            </div>
            <div>
              {data.Plot !== "N/A" && (
                <div className="plot">
                  <p>{data.Plot}</p>
                </div>
              )}
              <div className="cast">
                <span>
                  <span className="bold">Director: </span>
                  {data.Director}
                </span>
                <span>
                  <span className="bold">Actors: </span>
                  {data.Actors}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
