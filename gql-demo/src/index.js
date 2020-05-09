// React
import React from "react";
import { render } from "react-dom";
// Apollo
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "@apollo/react-hooks";
// Stitch
import { Stitch, AnonymousCredential } from "mongodb-stitch-browser-sdk";
// Check out app.js for examples of how to run GraphQL operations
import App from "./App";

export const APP_ID = "gql-stock-backend-svphb";

// Instantiate a StitchClient
const app = Stitch.hasAppClient(APP_ID)
  ? Stitch.getAppClient(APP_ID)
  : Stitch.initializeAppClient(APP_ID);

// Get the logged in user's access token from the StitchAuth interface
async function getAccessToken(credential) {
  if (!app.auth.user) {
    await app.auth.loginWithCredential(credential);
  } else {
    await app.auth.refreshAccessToken();
  }
  const { accessToken } = app.auth.activeUserAuthInfo;
  return accessToken;
}

// Add an Authorization header with a valid user access token to all requests
const credential = new AnonymousCredential();
const authorizationHeaderLink = setContext(async (_, { headers }) => {
  const accessToken = await getAccessToken(credential);
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };
});

// Construct a new Apollo HttpLink that connects to your app's GraphQL endpoint
const graphql_url = `https://stitch.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`;
const httpLink = new HttpLink({ uri: graphql_url });

// Construct a new Apollo client with the links we just defined
const client = new ApolloClient({
  link: authorizationHeaderLink.concat(httpLink),
  cache: new InMemoryCache(),
});

render(
  // Wrap your app with an ApolloProvider
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root"),
);
