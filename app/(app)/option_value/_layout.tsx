import { Link, Stack, useRouter } from "expo-router";
import { Platform, Pressable } from "react-native";
import {  Text } from "../../../etc/_Theme";
import { FontAwesome } from "@expo/vector-icons";

export default function OptionValueLayout() {
  const router = useRouter();

  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="option_values"
        options={{
          headerLargeTitle: true,
          headerRight: AddOptionValueButton,
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
        name="add_option_value"
        options={{
          title: "Add Option Value",
          presentation: "modal",
          headerRight: Platform.select({
            ios: DismissComposeButton,
          }),
        }}
      />
    </Stack>
  );
}

function AddOptionValueButton() {
  const router = useRouter();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        paddingRight: 8,
      }}
      onPress={() => router.push("/option_value/add_option_value")}
    >
      <Text style={{ fontSize: 14 }}> Add Option Value</Text>
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
