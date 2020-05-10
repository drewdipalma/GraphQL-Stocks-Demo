import "./index.css";
import * as React from "react";
import { APP_ID } from "./index";
import Stock from "./Stock";
import { useQuery } from "@apollo/react-hooks";
import { FIND_STOCK } from "./graphql-operations";

export default function App(props) {
  const [searchText, setSearchText] = React.useState("MDB");
  const { loading, error, data } = useQuery(FIND_STOCK, {
    variables: { query: { ticker: searchText } },
  });
  const stock = data ? data.RecordWithPrice : null;
  console.log(searchText);
  console.log(data);
  console.log(stock);

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
      <div className="saved-stocks">{/* saved stocks */}</div>
    </div>
  );
}
