import * as React from "react";
import {app} from "./index";

export default class UpgradeButton extends React.Component {
  constructor(props) {
      super(props);
    }

  render() {
    return (
      <button onClick={this.upgradeUser}>
        {app.auth.user.customData.isPremium ? 'Upgrade' : 'Downgrade'}
      </button>
    );
  }
}