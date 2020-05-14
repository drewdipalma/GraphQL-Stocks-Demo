import * as React from "react";
import { app } from "../index";
import { UPDATE_USER } from "../graphql-operations";
import { useMutation } from "@apollo/react-hooks";

export default function ExpandedStock(props) {
  const { stock, toggleExpand, setSavedStocks } = props;

  // Add GraphQL mutation necessary for updating saved Stocks via User type
  const [updateStocks, { loading: updating }] = useMutation(UPDATE_USER);

  // Update saved Stocks via GraphQL 
  const updateSavedStocks = async (e) => {
    try{
      const stockUpdate = app.auth.user.customData.savedStocks.includes(e.target.value) ? app.auth.user.customData.savedStocks.filter(item => item !== e.target.value) : [...app.auth.user.customData.savedStocks,e.target.value, ];
    
      await updateStocks({
        variables: {
          query: { _id: app.auth.user.id },
          set: {
            savedStocks: stockUpdate,
          },
        },
      });
  
      // Refresh token to get ensure new list of saved Stocks is in custom data
      await app.auth.refreshAccessToken();
  
      // Update the state of savedStocks
      setSavedStocks(app.auth.user.customData.savedStocks);
    } catch (error){
      console.log("Issue with updating saved stocks:", error);
    }
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
          <p>{stock.description.split(" ").slice(0, 10).join(" ") + "..."}</p>
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
            <div className="data">${stock.latestPrice.toFixed(2)}</div>
          </div>
          <div className="data-field">
            <button value={stock._id} onClick={updateSavedStocks}>
              {app.auth.user.customData.savedStocks && app.auth.user.customData.savedStocks.includes(stock._id) ? 'Remove' : 'Save'}
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
            <div className="data">${stock.latestPrice.toFixed(2)}</div>
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
