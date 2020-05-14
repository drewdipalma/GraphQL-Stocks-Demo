import * as React from "react";
import { app, client } from "../index";
import { UPDATE_USER } from "../graphql-operations";
import { useMutation } from "@apollo/react-hooks";

export default function ExpandedStock(props) {
  const { stock, shortDescription, toggleExpand, setSavedStocks } = props;
  console.log(stock);

  const [addStock, { loading: updating }] = useMutation(UPDATE_USER);

  const updateSavedStocks = async (e) => {
    console.log("foo");
    await addStock({
      variables: {
        query: { _id: app.auth.user.id },
        set: {
          savedStocks: [
            ...app.auth.user.customData.savedStocks,
            e.target.value,
          ],
        },
      },
    });

    client.resetStore();
    await app.auth.refreshAccessToken();
    console.log("app.auth.user.customData", app.auth.user.customData);
    setSavedStocks(app.auth.user.customData.savedStocks);
  };

  return stock.isPremium ? (
    <div className="expanded-wrapper">
      <div className="stock" onClick={toggleExpand}>
        <div>
          <h2 className="stock-name">{stock.shortName}</h2>
          <div className="stock-ticker">Ticker: {stock._id}</div>
        </div>
        <div className="expand-arrow">-</div>
      </div>
      <div className="prem-data-section">
        <div className="prem-data-col left">
          <h4>Description:</h4>
          <p>{shortDescription}</p>
          <div className="data-field">
            <h4>Industry: </h4>
            <div className="data">{stock.industry}</div>
          </div>
          <div className="data-field">
            <h4>CEO: </h4>
            <div className="data">{stock.ceo}</div>
          </div>
        </div>
        <div className="prem-data-col right">
          <div className="data-field">
            <h4>Latest Price: </h4>
            <div className="data">${stock.latestPrice}</div>
          </div>
          <div className="data-field">
            <h4>Market Cap: </h4>
            <div className="data">
              {stock.marketCap ? stock.marketCap : "N/A"}
            </div>
          </div>
          <div className="data-field">
            <button value={stock._id} onClick={updateSavedStocks}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="expanded-wrapper">
      <div className="stock" onClick={toggleExpand}>
        <div>
          <h2 className="stock-name">{stock.shortName}</h2>
          <div className="stock-ticker">Ticker: {stock._id}</div>
        </div>
        <div id="current-price-field">
          <div className="data-field">
            <h4>Latest Price: </h4>
            <div className="data">${stock.latestPrice}</div>
          </div>
        </div>
        <div className="expand-arrow">-</div>
      </div>
      <div className="prem-data-section">
        <div className="prem-data-col left">
          You must be a premium user to see more information.
        </div>
      </div>
    </div>
  );
}
