import * as React from "react";
import ExpandedStock from "./ExpandedStock";
import { app } from "./index.js";

export default class Stock extends React.Component {
  constructor(props) {
    super();
    this.state = {
      expanded: false,
      shortDescription: "",
    };

    this.toggleExpand = this.toggleExpand.bind(this);
    this.shortenDescription = this.shortenDescription.bind(this);
  }

  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  shortenDescription(stockDescription) {
    if (app.auth.user.customData.premiumUser) {
      return stockDescription.split(" ").slice(0, 10).join(" ") + "...";
    }
  }

  render() {
    return this.state.expanded ? (
      <ExpandedStock
        stock={this.props.stock}
        shortDescription={this.shortenDescription(this.props.stock.description)}
        toggleExpand={this.toggleExpand}
      />
    ) : (
      <div className="stock" onClick={this.toggleExpand}>
        <div>
          <h2 className="stock-name">{this.props.stock.shortName}</h2>
          <div className="stock-ticker">Ticker: {this.props.stock._id}</div>
        </div>
        <div id="current-price-field">
          <div className="data-field">
            <h4>Latest Price: </h4>
            <div className="data">${this.props.stock.latestPrice}</div>
          </div>
        </div>
        <div className="expand-arrow">+</div>
      </div>
    );
  }
}
