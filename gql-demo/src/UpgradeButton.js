import * as React from "react";
import { app } from "./index";

export default function UpgradeButton() {
  const [premium, setPremium] = React.useState(
    app.auth.user.customData.isPremium
  );
  return (
    <button onClick={() => setPremium(!premium)}>
      {premium ? "Downgrade" : "Upgrade"}
    </button>
  );
}
