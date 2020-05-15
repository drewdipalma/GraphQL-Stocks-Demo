import * as React from "react";
import { app, client } from "../index";
import { UPDATE_USER } from "../graphql-operations";
import { useMutation } from "@apollo/react-hooks";

export default function UpgradeButton(props) {
  const { premiumUser, setPremiumUser, loggedIn } = props;
  const [upgradeUser, { loading: updating }] = useMutation(UPDATE_USER);

  const updateUser = async () => {
    try{
      await upgradeUser({
        variables: {
          query: { _id: app.auth.user.id },
          set: { premiumUser: !app.auth.user.customData.premiumUser },
        },
      });
      
      await app.auth.refreshAccessToken();
      await client.clearStore()
      await client.resetStore()
      setPremiumUser(app.auth.user.customData.premiumUser);
    } catch(error){
      console.log("Issue upgrading/downgrading user:", error);
    }
  };

  return premiumUser && loggedIn ? (
    <button className="utilities-elem" onClick={updateUser}>
      Downgrade
    </button>
  ) : (
    <button
      className="utilities-elem"
      onClick={updateUser}
      disabled={!loggedIn}
    >
      Upgrade
    </button>
  );
}
