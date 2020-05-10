import "./index.css";
import * as React from "react";
import { APP_ID } from "./index";
import Stock from "./Stock";
import LoginButton from "./LoginButton";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FIND_STOCK, UPDATE_USER } from "./graphql-operations";
import { app } from "./index.js";
import SavedStock from "./SavedStock";

export default function App(props) {
  const [searchText, setSearchText] = React.useState("MDB");
  const { loading, error, data } = useQuery(FIND_STOCK, {
    variables: { query: { ticker: searchText } },
  });
  const stock = data ? data.RecordWithPrice : null;
  // console.log(searchText);
  // console.log(data);
  // console.log(stock);
  let savedStocks = ["MDB", "AAP", "MDB", "MDB", "MDB"];

  console.log(savedStocks);

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
          <LoginButton />
        </div>
      </div>
      <div className="search-area">
        <span className="subheading">Search for a stock – </span>
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
          <div className="status">
            No Stock with that ticker!
            <pre>
              Bad:{" "}
              {error.graphQLErrors.map(({ message }, i) => (
                <span key={i}>{message}</span>
              ))}
            </pre>
          </div>
        )}
        {stock && <Stock stock={stock} />}
      </div>
      <div className="saved-stocks">
        {savedStocks.map((stock) => {
          return <SavedStock stock={stock} />;
        })}
      </div>
    </div>
  );
}
