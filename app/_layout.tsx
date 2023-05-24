import "react-native-gesture-handler";
import { Slot, Stack } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";

import { ThemeProvider } from "../etc/_Theme";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
import { Authenticator } from "@aws-amplify/ui-react-native";

Amplify.configure(awsExports);

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

export default function RootLayout() {
  return (
    // Setup the auth context and render our layout inside of it
    <Authenticator.Provider>
      <RootSiblingParent>
        <ThemeProvider>
          <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </SafeAreaProvider>
        </ThemeProvider>
      </RootSiblingParent>
    </Authenticator.Provider>
  );
}
