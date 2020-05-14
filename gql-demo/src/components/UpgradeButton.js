import * as React from "react";
import { app, client } from "../index";
import { UPDATE_USER } from "../graphql-operations";
import { useMutation } from "@apollo/react-hooks";

export default function UpgradeButton(props) {
  const { premiumUser, setPremiumUser, loggedIn } = props;
  const [upgradeUser, { loading: updating }] = useMutation(UPDATE_USER);

  const updateUser = async () => {
    console.log("foo");
    await upgradeUser({
      variables: {
        query: { _id: app.auth.user.id },
        set: { premiumUser: !app.auth.user.customData.premiumUser },
      },
    });

    client.resetStore();
    await app.auth.refreshAccessToken();
    console.log(
      "app.auth.user.customData in upgrade button: ",
      app.auth.user.customData
    );
    setPremiumUser(app.auth.user.customData.premiumUser);
  };

  // console.log("app.auth.user.customData: ", app.auth.user.customData);

  return premiumUser ? (
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
