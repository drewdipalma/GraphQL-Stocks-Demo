import "./index.css";
import * as React from "react";
import Stock from "./Stock";
import LoginButton from "./LoginButton";
import SavedStock from "./SavedStock";
import { app } from "./index";
import UpgradeButton from "./UpgradeButton";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FIND_STOCK } from "./graphql-operations";
import {AnonymousCredential, UserPasswordCredential} from "mongodb-stitch-browser-sdk";

export default function App(props) {
  const [searchText, setSearchText] = React.useState("MDB");
  const [savedStocks, setSavedStocks] = React.useState(app.auth.user.customData ? app.auth.user.customData.savedStocks : []);

  const { loading, error, data } = useQuery(FIND_STOCK, {
    variables: { query: { ticker: searchText } },
  });

  const stock = data ? data.RecordWithPrice : null;

  return (
    <div className="App">
      <div className="header">
        <div id="main-title-area">
          <h1 id="page-title">Find a Stock</h1>
        </div>
        <div className="utilities">
          <UpgradeButton />
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
        {stock && <Stock stock={stock} />}
      </div>
      <div className="saved-stocks">
        {savedStocks && savedStocks.map((stock) => {return <SavedStock stock={stock} />;})}
      </div>
    </div>
  );
}
