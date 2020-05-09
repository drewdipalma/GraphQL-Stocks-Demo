import "./index.css";
import * as React from "react";
import { APP_ID } from "./index";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FIND_STOCK } from "./graphql-operations";

export default function App(props) {
  const [searchText, setSearchText] = React.useState("MDB");
  const { loading, data } = useQuery(FIND_STOCK, {
    variables: { query: { _id: searchText } },
  });
  const stock = data ? data.basicRecord : null;
  console.log(stock);
  console.log(data);

  return (
    <div className="App">
      <div className="header">
        <div id="main-title-area">
          <h1 id="page-title">Find a Stock</h1>
        </div>
        <div className="utilities">
          <button className="utilities-elem" id="upgrade-button">
            Upgrade
          </button>
          <button className="utilities-elem" id="login">
            Login
          </button>
        </div>
      </div>
      <div className="search-area">
        <span className="subheading">
          The app automatically searches as you type – 
        </span>
        <div className="title-input">
          <input
            className="fancy-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div className="search-result-area">
        {!loading && !stock && (
          <div className="status">No Stock with that ticker!</div>
        )}
        {stock && (
          <div className="current-stock">
            <h2>{stock.shortName}</h2>
            <div>Ticker: {stock._id}</div>
            <br />
          </div>
        )}
      </div>
    </div>
  );
}
