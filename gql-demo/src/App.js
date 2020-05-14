import "./index.css";
import * as React from "react";
import Stock from "./Stock";
import LoginButton from "./LoginButton";
import SavedStock from "./SavedStock";
import { app } from "./index";
import UpgradeButton from "./UpgradeButton";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FIND_STOCK, UPDATE_USER } from "./graphql-operations";

export default function App(props) {
  const [searchText, setSearchText] = React.useState("MDB");
  
  const { loading, error, data } = useQuery(FIND_STOCK, {
    variables: { query: { ticker: searchText } },
  });

  const [upgradeUser, { loading: updating }] = useMutation(UPDATE_USER);

  const updateUser = async () => {
    let response = await upgradeUser({
      variables: {
        query: { _id: app.auth.user.id },
        set: { premiumUser: !app.auth.user.customData.premiumUser },
      },
    });

    await app.auth.refreshAccessToken();
  };

  const stock = data ? data.RecordWithPrice : null;

  let savedStocks = app.auth.user.customData ? app.auth.user.customData.savedStocks: [];
  console.log(savedStocks)

  return (
    <div className="App">
      <div className="header">
        <div id="main-title-area">
          <h1 id="page-title">Find a Stock</h1>
        </div>
        <div className="utilities">
          <button className="utilities-elem " onClick={() => updateUser()}>
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
        {stock ? (savedStocks.map((stock) => {
          return <SavedStock stock={stock} />;
        })) : ""}
      </div>
    </div>
  );
}
