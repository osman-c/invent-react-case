const API_KEY = "8607f37e";

export type SearchMovie = {
  title?: string;
  type?: string;
  year?: string;
  page?: number;
};

export type GetMovie = {
  imdbID: string;
};

type Rating = {
  Source: string;
  Value: string;
};

export type Movie = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: "True";
};

export type MovieSummary = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type ResponseFalse = {
  Response: "False";
  Error: string;
};

export type SearchResponseTrue = {
  Response: "True";
  totalResults: string;
  Search: MovieSummary[];
};

export type Search = ResponseFalse | SearchResponseTrue;
export type Get = ResponseFalse | Movie;

async function searchMovie({ year, title, type, page }: SearchMovie) {
  const url = new URL("http://www.omdbapi.com/");
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("page", page ? page.toString() : "1");
  url.searchParams.append("s", title ? title : "Pokemon");

  if (year) {
    url.searchParams.append("y", year);
  }
  if (type) {
    url.searchParams.append("type", type);
  }

  return fetch(url).then((res) => res.json() as Promise<Search>);
}

async function getMovie({ imdbID }: GetMovie) {
  const url = new URL("http://www.omdbapi.com/");
  url.searchParams.append("apikey", API_KEY);
  url.searchParams.append("i", imdbID);
  // url.searchParams.append("plot", "full");

  return fetch(url).then((res) => res.json() as Promise<Movie>);
}

const api = {
  searchMovie,
  getMovie,
};

export default api;
