import React from "react";
import ReactDOM from "react-dom/client";
import SearchPage from "./SearchPage.tsx";
import "./index.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import api from "./api/omdb.ts";
import EntryPage from "./EntryPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
    loader: async ({ request }) => {
      const url = new URL(request.url);
      const page = url.searchParams.get("page");

      return api.searchMovie({
        type: url.searchParams.get("type") || undefined,
        year: url.searchParams.get("year") || undefined,
        page: page ? +page : undefined,
        title: url.searchParams.get("title") || undefined,
      });
    },
  },
  {
    path: "/entry/:id",
    element: <EntryPage />,
    loader: async ({ params }) => {
      return api.getMovie({ imdbID: params.id! });
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
