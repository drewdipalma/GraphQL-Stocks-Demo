import React from "react";
import { app } from "../index";
import {
  AnonymousCredential,
  UserPasswordCredential,
} from "mongodb-stitch-browser-sdk";

export default function LoginFields(props) {
  // Set-up state for Username/Password
  const { loggedIn, setLoggedIn } = props;
  const [username, setUsername] = React.useState("foo@bar.com");
  const [password, setPassword] = React.useState("Password");

  // Handle Login
  async function handleLogin(event) {
    try {
      event.preventDefault();
      await app.auth.loginWithCredential(
        new UserPasswordCredential(username, password)
      );
      setLoggedIn(
        app.auth.user.loggedInProviderType === "anon-user" ? false : true
      );
    } catch (error) {
      console.log("Issue with user Login:", error);
    }
  }

  // Handle Logout
  async function handleLogout() {
    try {
      await app.auth.loginWithCredential(new AnonymousCredential());
      setLoggedIn(
        app.auth.user.loggedInProviderType === "anon-user" ? false : true
      );
      setUsername("foo@bar.com");
      setPassword("Password");
    } catch (error) {
      console.log("Issue with user Logout:", error);
    }
  }

  return loggedIn ? (
    <button onClick={handleLogout}>Logout</button>
  ) : (
    <form onSubmit={handleLogin}>
      <label className="login-label" htmlFor="username">
        Username:
      </label>
      <input
        className="login-input"
        type="email"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label className="login-label" htmlFor="password">
        Password:
      </label>
      <input
        className="login-input"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" type="submit">
        Login
      </button>
    </form>
  );
}
