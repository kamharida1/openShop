import { Link, Stack, useRouter } from "expo-router";
import { Platform, Pressable } from "react-native";
import { Box, Text } from "../../../etc/_Theme";
import { FontAwesome } from "@expo/vector-icons";

export const unstable_settings = {
  initialRouteName: "option_types",
};

export default function OptionTypeLayout() {
  const router = useRouter();

  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="option_types"
        options={{
          headerLargeTitle: true,
          headerRight: AddOptionTypeButton,
          headerSearchBarOptions: {
            onChangeText: (event) => {
              // Update the query params to match the search query.
              router.setParams({
                q: event.nativeEvent.text,
              });
            },
          },
        }}
      />
      <Stack.Screen
        name="add_option_type"
        options={{
          title: "Add Option Type",
          presentation: "modal",
          headerRight: Platform.select({
            ios: DismissComposeButton,
          }),
        }}
      />
    
    </Stack>
  );
}

function AddOptionTypeButton() {
  const router = useRouter();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        paddingRight: 8,
      }}
      onPress={() => router.push("/option_type/add_option_type")}
    >
      <Text style={{ fontSize: 14 }}> Add Option Type </Text>
      <FontAwesome name="sign-out" size={24} color="black" />
    </Pressable>
  );
}

function DismissComposeButton() {
  return (
    <Link href="..">
      <Text
        style={{
          fontWeight: "normal",
          paddingHorizontal: 8,
          fontSize: 16,
        }}
      >
        Back
      </Text>
    </Link>
  );
}
