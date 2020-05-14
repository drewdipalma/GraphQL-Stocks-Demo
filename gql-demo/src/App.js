import "./index.css";
import * as React from "react";
import {app, client} from "./index";
import Stock from "./components/Stock";
import SavedStock from "./components/SavedStock";
import LoginFields from "./components/LoginFields";
import UpgradeButton from "./components/UpgradeButton";
import {useQuery} from "@apollo/react-hooks";
import {FIND_STOCK} from "./graphql-operations";


export default function App(props) {
  
  // State for Search Text, set by default to MongoDB 
  const [searchText, setSearchText] = React.useState("MDB");

  // State for Saved Stocks set based on user's custom data 
  const [savedStocks, setSavedStocks] = React.useState(
    app.auth.user && app.auth.user.customData ? app.auth.user.customData.savedStocks : []
  );

  // State for Log-in, based on Anonymous vs non-Anonymous authentication
  const [loggedIn, setLoggedIn] = React.useState(
    app.auth.user && app.auth.user.loggedInProviderType === "anon-user" ? false : true
  );

  // State for whether the user is a "Premium User"
  const [premiumUser, setPremiumUser] = React.useState(
    app.auth.user && app.auth.user.customData.premiumUser ? true : false
  );

    // Get Stock via GraphQL and update 'stock' value
    // TO DO: Update to a Hook?
    const { loading, error, data } = useQuery(FIND_STOCK, {
      variables: { query: { ticker: searchText } },
    });
  
    const stock = data ? data.RecordWithPrice : null;

  // Update the custom data by re-freshing the Token on Login/Upgrade
  React.useEffect(() => {
    try {
        async function getCustomData() {
          await app.auth.refreshAccessToken();
          setPremiumUser(app.auth.user.customData.premiumUser);
          setSavedStocks(app.auth.user.customData.premiumUser ? app.auth.user.customData.savedStocks : []);
        }
        getCustomData();
      } catch (error) {
      console.log("Issue refreshing Custom Data:", error);
    }
  }, [loggedIn, setLoggedIn, premiumUser, setPremiumUser]);

  return (
    <div className="App">
      <div className="header">
        <div id="main-title-area">
          <h1 id="page-title">Find a Stock</h1>{" "}
          {premiumUser ? <span id="premium-flag"> Premium</span> : ""}
        </div>
        <div className="utilities">
          
          <LoginFields loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
          <UpgradeButton
            premiumUser={premiumUser}
            setPremiumUser={setPremiumUser}
            setSavedStocks={setSavedStocks}
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
        {stock && <Stock stock={stock} setSavedStocks={setSavedStocks} />}
      </div>
      <div className="saved-stocks">
        {savedStocks &&
          savedStocks.map((stock) => {
            return <SavedStock stock={stock} setSavedStocks={setSavedStocks} />;
          })}
      </div>
    </div>
  );
}
