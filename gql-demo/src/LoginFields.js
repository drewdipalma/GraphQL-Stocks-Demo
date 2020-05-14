import React from "react";
import { app } from "./index";
import {
  AnonymousCredential,
  UserPasswordCredential,
} from "mongodb-stitch-browser-sdk";

export default function LoginFields() {
  const [loggedIn, setLoggedIn] = React.useState(
    app.auth.user.loggedInProviderType === "anon-user" ? false : true
  );
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function handleLogin(event) {
    try {
      event.preventDefault();
      loggedIn
        ? await app.auth.loginWithCredential(new AnonymousCredential())
        : await app.auth.loginWithCredential(
            new UserPasswordCredential(username, password)
          );
      setLoggedIn(
        app.auth.user.loggedInProviderType === "anon-user" ? false : true
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogout() {
    try {
      loggedIn
        ? await app.auth.loginWithCredential(new AnonymousCredential())
        : await app.auth.loginWithCredential(
            new UserPasswordCredential(username, password)
          );
      setLoggedIn(
        app.auth.user.loggedInProviderType === "anon-user" ? false : true
      );
    } catch (error) {
      console.log(error);
    }
  }

  return loggedIn ? (
    <button onClick={handleLogout}>Logout</button>
  ) : (
    <form onSubmit={handleLogin}>
      <label htmlFor="username">Username:</label>
      <input
        type="email"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
