import * as React from "react";
import {app} from "./index";
import {AnonymousCredential, UserPasswordCredential} from "mongodb-stitch-browser-sdk";

export default class LoginButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {loggedIn : app.auth.user.loggedInProviderType === 'anon-user' ? false : true};
        this.handleClick = this.handleClick.bind(this);
      }

    async handleClick(loginInfo) {
        try{
            this.state.loggedIn ? 
            await app.auth.loginWithCredential(new AnonymousCredential()):
            await app.auth.loginWithCredential(new UserPasswordCredential("foo@bar.com", "Password"));
        } catch (error){
            console.log(error);
        }
        
        this.setState(state => ({
            loggedIn: app.auth.user.loggedInProviderType === 'anon-user' ? false : true
          }));
    }
  
    render() {
      return (
        <button onClick={(loginInfo) => this.handleClick(loginInfo)}>
          {this.state.loggedIn ? 'Log Out' : 'Log In'}
        </button>
      );
    }
  }