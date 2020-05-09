import "./index.css";
import * as React from "react";
import { APP_ID } from "./index";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FIND_STOCK } from "./graphql-operations";

export default function App(props) {
  const [searchText, setSearchText] = React.useState("MDB");
  const { loading, data } = useQuery(FIND_STOCK, {
    variables: { query: { "_id":  searchText} },
  });
  const stock = data ? data.basicRecord : null;
  console.log(stock);
  console.log(data);

  return (
    <div className="App">
      <h1>Find a Stock</h1>
      <span className="subheading">
        The app automatically searches as you type – 
      </span>
      <div className="title-input">
        <input
          className="fancy-input"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          type="text"
        />
      </div>
      {
        !loading &&
        !stock && <div className="status">No Stock with that ticker!</div>
      }
      {stock && (
        <div>
          <h2>{stock.shortName}</h2>
          <div>Ticker: {stock._id}</div>
          <br />
        </div>
      )}
    </div>
  );
}
