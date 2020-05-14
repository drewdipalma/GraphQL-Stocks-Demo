import * as React from "react";
import ExpandedStock from "./ExpandedStock";

export default class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};

    this.toggleExpand = this.toggleExpand.bind(this);
  }

  // Toggles Stock expanded view
  toggleExpand() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    // Show either the Basic or Expanded views of the Stock
    return this.state.expanded ? (
      <ExpandedStock
        stock={this.props.stock}
        toggleExpand={this.toggleExpand}
        setSavedStocks={this.props.setSavedStocks}
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
            <div className="data">${this.props.stock.latestPrice.toFixed(2)}</div>
          </div>
        </div>
        <div className="expand-arrow">+</div>
      </div>
    );
  }
}
