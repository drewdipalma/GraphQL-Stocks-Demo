import * as React from "react";
import {app} from "./index";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER } from "./graphql-operations";

export default class UpdateButton extends React.Component {
    constructor(props) {
        super(props);
         
        this.state = {isPremium: app.auth.user.customData.isPremium};
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
            user: app.auth.user,
            loggedIn: app.auth.user.loggedInProviderType === 'anon-user' ? false : true
          }));
    }
  
    render() {
      return (
        <button onClick={(loginInfo) => this.handleClick(loginInfo)}>
          {this.state.isPremium ? 'Upgrade' : 'Downgrade'}
        </button>
      );
    }
  }