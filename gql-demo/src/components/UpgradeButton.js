import * as React from "react";
import { app, client } from "../index";
import { UPDATE_USER } from "../graphql-operations";
import { useMutation } from "@apollo/react-hooks";

export default function UpgradeButton(props) {
  const { premiumUser, setPremiumUser } = props;
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
    setPremiumUser(app.auth.user.customData.premiumUser);
  };

  console.log(
    "app.auth.user.customData: ",
    app.auth.user.customData.premiumUser
  );

  return (
    <button className="utilities-elem" onClick={updateUser}>
      {premiumUser ? "Downgrade" : "Upgrade"}
    </button>
  );
}
