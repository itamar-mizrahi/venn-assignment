import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState("Loading...");
  const [selectedItem, setSelectedItem] = useState("nothing selected");
  useEffect(() => {
    const url = "https://jsonmock.hackerrank.com/api/movies/search/?Title=man&page=2";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json.data);
        const listItems = json.data.map((data, key) => (
          <tr
            key={key}
            style={{ backgroundColor: isChecked(key) ? "black" : "" }}
          >
            <td>
              <input
                type="checkbox"
                defaultChecked={isChecked(key)}
                onChange={(e) => {
                  setCheckbox(e, key, data);
                }}
                key={key + "name"}
              ></input>{" "}
              {key + 1} : {data.Title}
            </td>
            {data.Title}
            <td key={key + "callsign"}>{data.Title}</td>
            <td key={key + "country"}>{data.Year}</td>
            <td key={key + "width"}>{data.imdbID}</td>
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
          <th>Name</th>
          <th>Title</th>
          <th>Year</th>
          <th>ID</th>
        </tr>
        {data}
      </table>
      <div className="selected-item">{selectedItem}</div>
    </div>
  );

  function setCheckbox(e, key, shipDetails) {
    if (e.target.checked === true) {
      localStorage.setItem(key, true);
      e.currentTarget.parentElement.parentElement.style.backgroundColor =
        "blue";
    } else {
      localStorage.setItem(key, false);
      e.currentTarget.parentElement.parentElement.style.backgroundColor = "";
    }
    setSelectedItem(() => {
      return Object.entries(shipDetails).map((row, key) => (
        <div key={key}>{row[0] + " : " + row[1]}</div>
      ));
    });
  }

  function isChecked(key) {
    const checkboxStat = window.localStorage.getItem(key);

    if (checkboxStat === "true") {
      return true;
    } else {
      return false;
    }
  }
}

export default App;