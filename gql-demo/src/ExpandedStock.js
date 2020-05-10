import * as React from "react";

export default function ExpandedStock(props) {
  const { stock, shortDescription, toggleExpand } = props;
  console.log(stock)
  return  stock.isPremium ? (
   
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
  <div className="data">{stock.marketCap ? stock.marketCap : "N/A"}</div>
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
        <div className="expand-arrow">-</div>
      </div>
      <div className="prem-data-section">
        <div className="prem-data-col left">
          <h4>Description:</h4>
          <p>Company description...</p>
          <div className="data-field">
            <h4>Industry: </h4>
            <div className="data">Industry Name</div>
          </div>
          <div className="data-field">
            <h4>CEO: </h4>
            <div className="data">CEO Name</div>
          </div>
        </div>
        <div className="prem-data-col right">
          <div className="data-field">
            <h4>Latest Price: </h4>
            <div className="data">${stock.latestPrice}</div>
          </div>
          <div className="data-field">
            <h4>Market Cap: </h4>
            <div className="data">$xxx</div>
          </div>
        </div>
      </div>
    </div>
  );
}
