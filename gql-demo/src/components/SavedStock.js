import * as React from "react";
import Stock from "./Stock";
import { FIND_STOCK } from "../graphql-operations";
import { useQuery } from "@apollo/react-hooks";

export default function SavedStock(props) {
  const { stock, setSavedStocks } = props;

  // Get Stock via GraphQL and update 'stock' value
  const { loading, error, data } = useQuery(FIND_STOCK, {
    variables: { query: { ticker: stock } },
  });
  const eachStock = data ? data.RecordWithPrice : null;

  return (
    eachStock && <Stock stock={eachStock} setSavedStocks={setSavedStocks} />
  );
}
