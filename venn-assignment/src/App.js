import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("Loading...");
  useEffect(() => {
    const url =
      "https://jsonmock.hackerrank.com/api/movies/search/?Title=man&page=2";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.data);
        const listItems = json.data.map((data, key) => (
          <tr key={key} style={{ backgroundColor: "black" }}>
            <td key={key + "Title"}>{data.Title}</td>
            <td key={key + "Year"}>{data.Year}</td>
            <td key={key + "imdbID"}>{data.imdbID}</td>
          </tr>
        ));
        setData(listItems);
      } catch (error) {}
    };

    fetchData();
  }, []);
  return (
    <div className="App-header">
      <table>
        <tr>
          <th>Title</th>
          <th>Year</th>
          <th>ID</th>
        </tr>
        {data}
      </table>
    </div>
  );
}

export default App;
