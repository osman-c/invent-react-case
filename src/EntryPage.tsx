import { useLoaderData } from "react-router-dom";
import Entry from "./Entry";
import { Get } from "./api/omdb";

function EntryPage() {
  const data = useLoaderData() as Get;
  console.log(data);

  return (
    <div className="app-wrapper">
      {data.Response === "False" ? <p>{data.Error}</p> : <Entry />}
    </div>
  );
}

export default EntryPage;
