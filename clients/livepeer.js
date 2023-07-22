import { createReactClient } from "@livepeer/react";
import { studioProvider } from "livepeer/providers/studio";

const LPClient = createReactClient({
  provider: studioProvider({ apiKey: "c516cb9b-4f6e-4e52-ad95-6064df66bec1" }),
});

export default LPClient;
