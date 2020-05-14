import * as React from "react";
import { app, client } from "./index";
import { UPDATE_USER } from "./graphql-operations";
import { useMutation } from "@apollo/react-hooks";

export default function UpgradeButton() {
  const [upgradeUser, { loading: updating }] = useMutation(UPDATE_USER);

  const updateUser = async () => {
    console.log("foo")
    await upgradeUser({
      variables: {
        query: { _id: app.auth.user.id },
        set: { premiumUser: !app.auth.user.customData.premiumUser },
      },
    });

    client.resetStore();

    await app.auth.refreshAccessToken();
  };

  console.log(app.auth.user.customData)

  return (
    <button  className="utilities-elem" onClick={updateUser}>
      {app.auth.user.customData.premiumUser ? "Downgrade" : "Upgrade"}
    </button>
  );
}
