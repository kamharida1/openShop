import "react-native-gesture-handler";
import { Slot, Stack } from "expo-router";
import { RootSiblingParent } from "react-native-root-siblings";
import { ThemeProvider } from "../etc/_Theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DataStore } from "aws-amplify";
import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter";
import { Amplify } from "aws-amplify";
import  {useColorScheme} from 'react-native'
import {
  Authenticator,
  ThemeProvider as AmplifyProvider,
  Theme,
  defaultDarkModeOverride,
} from "@aws-amplify/ui-react-native";

import Login from './(auth)/login'
import { AmplifyTheme } from "../etc/amplify_theme";

import awsExports from "../src/aws-exports";

DataStore.configure({
  storageAdapter: ExpoSQLiteAdapter,
});

Amplify.configure(awsExports);

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "index",
};

const theme: Theme = {
  overrides: [defaultDarkModeOverride],
  tokens: {
   
  },
};

export default function RootLayout() {
  const colorMode = useColorScheme();
  return (
    // Setup the auth context and render our layout inside of it
    <AmplifyProvider theme={theme} colorMode={colorMode}>
      <Authenticator.Provider>
        <RootSiblingParent>
          <ThemeProvider>
            <Authenticator
              Container={(props) => (
                // reuse default `Container` and apply custom background
                <Authenticator.Container
                  {...props}
                  //style={{ backgroundColor: "pink" }}
                />
              )}
              //components={{SignIn: Login}}
            >
              <SafeAreaProvider>
                <Stack
                  screenOptions={{headerShown: false}}
                >
                  <Stack.Screen
                    name="index"
                    options={{
                      title: "Welcome",
                    }}
                  />
                </Stack>
              </SafeAreaProvider>
            </Authenticator>
          </ThemeProvider>
        </RootSiblingParent>
      </Authenticator.Provider>
    </AmplifyProvider>
  );
}
