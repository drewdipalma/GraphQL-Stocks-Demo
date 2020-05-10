import "./index.css";
import * as React from "react";
import { APP_ID } from "./index";
import { useQuery} from "@apollo/react-hooks";
import {FIND_STOCK} from "./graphql-operations";

export default function App(props) {
  const [searchText, setSearchText] = React.useState("MDB");
  const { loading, error, data } = useQuery(FIND_STOCK, 
  {variables: { query: { ticker:  searchText} }, 
  });
  const stock = data ? data.RecordWithPrice : null;
  console.log(searchText)
  console.log(data)
  console.log(stock)

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
        !stock && (
          <div className="status">No Stock with that ticker!
            <pre>Bad: {error.graphQLErrors.map(({ message }, i) => (
              <span key={i}>{message}</span>
            ))}
            </pre>
          </div>
        )
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
