import "./index.css";
import * as React from "react";
import Stock from "./components/Stock";
import LoginButton from "./components/LoginButton";
import SavedStock from "./components/SavedStock";
import { app, client } from "./index";
import UpgradeButton from "./components/UpgradeButton";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FIND_STOCK } from "./graphql-operations";
import {
  AnonymousCredential,
  UserPasswordCredential,
} from "mongodb-stitch-browser-sdk";
import LoginFields from "./components/LoginFields";

export default function App(props) {
  // console.log("app.auth.user.customData in App.js: ", app.auth.user);

  const [searchText, setSearchText] = React.useState("MDB");
  const [savedStocks, setSavedStocks] = React.useState(
    app.auth.user.customData ? app.auth.user.customData.savedStocks : []
  );
  const [loggedIn, setLoggedIn] = React.useState(
    app.auth.user.loggedInProviderType === "anon-user" ? false : true
  );
  const [premiumUser, setPremiumUser] = React.useState(
    app.auth.user.customData.premiumUser ? true : false
  );
  console.log("saved stocks: ", savedStocks);
  console.log("loggedIn: ", loggedIn);
  console.log("premiumUser: ", premiumUser);

  React.useEffect(() => {
    async function getCustomData() {
      await app.auth.refreshAccessToken();
      setPremiumUser(app.auth.user.customData.premiumUser);
    }
    getCustomData();
  }, [loggedIn, setPremiumUser]);

  React.useEffect(() => {
    setSavedStocks(app.auth.user.customData.savedStocks);
  }, [premiumUser]);

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
          <LoginFields loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <UpgradeButton
            premiumUser={premiumUser}
            setPremiumUser={setPremiumUser}
            loggedIn={loggedIn}
          />
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
        {savedStocks &&
          savedStocks.map((stock) => {
            return <SavedStock stock={stock} />;
          })}
      </div>
    </div>
  );
}
