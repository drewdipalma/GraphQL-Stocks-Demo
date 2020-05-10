import * as React from "react";
import { APP_ID } from "./index";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FIND_STOCK } from "./graphql-operations";

export default class Stock extends React.Component {
  constructor(props) {
    super();
    this.state = {
      expanded: false,
    };
  }

  render() {
    return (
      <div className="stock">
        <div>
          <h2 className="stock-name">{this.props.stock.shortName}</h2>
          <div className="stock-ticker">Ticker: {this.props.stock._id}</div>
        </div>
        <div className="expand-arrow">+</div>
      </div>
    );
  }
}
