import * as React from "react";
import {app, client} from "./index";
import {AnonymousCredential, UserPasswordCredential} from "mongodb-stitch-browser-sdk";

export default class LoginButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn : app.auth.user.loggedInProviderType === 'anon-user' ? false : true};
        this.handleClick = this.handleClick.bind(this);
      }

    async handleClick(loginInfo) {
      this.state.loggedIn ? 
      await app.auth.loginWithCredential(new AnonymousCredential()):
      await app.auth.loginWithCredential(new UserPasswordCredential("foo@bar.com", "Password"));
  
      client.resetStore();

      this.setState(state => ({
        loggedIn: app.auth.user.loggedInProviderType === 'anon-user' ? false : true
      }));
    }
  
    render() {
      return (
        <button className="utilities-elem" onClick={(loginInfo) => this.handleClick(loginInfo)}>
          {this.state.loggedIn ? 'Log Out' : 'Log In'}
        </button>
      );
    }
  }