import { Stack, useRouter } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../../src/store";

import { Amplify } from "aws-amplify";
import awsconfig from "../../src/aws-exports";

Amplify.configure(awsconfig);

export const unstable_settings = {
  initialRouteName: "index",
};

export default function AppLayout() {
  const router = useRouter();
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
            headerLargeTitle: true,
          }}
        />
      </Stack>
    </Provider>
  );
}
