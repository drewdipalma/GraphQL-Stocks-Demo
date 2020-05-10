import * as React from "react";
import { APP_ID } from "./index";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FIND_STOCK } from "./graphql-operations";

export default function ExpandedStock(props) {
  const { stock } = props;
  return (
    <div className="stock expanded">
      <div>
        <h2 className="stock-name">{stock.shortName}</h2>
        <div className="stock-ticker">Ticker: {stock._id}</div>
      </div>
      <div className="expand-arrow">+</div>
    </div>
  );
}
