import { Link, Stack, useRouter } from "expo-router";
import { Platform, Pressable } from "react-native";
import { Text } from "../../../etc/_Theme";
import { FontAwesome } from "@expo/vector-icons";

export const unstable_settings = {
  initialRouteName: "prototypes",
};

export default function BrandLayout() {
  const router = useRouter();

  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="prototypes"
        options={{
          title: "Prototypes",
          headerLargeTitle: true,
          headerRight: AddPrototypeButton,
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
        name="add_prototype"
        options={{
          title: "Add Prototype",
          presentation: "modal",
          headerRight: Platform.select({
            ios: DismissComposeButton,
          }),
        }}
      />
    </Stack>
  );
}

function AddPrototypeButton() {
  const router = useRouter();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        paddingRight: 8,
      }}
      onPress={() => router.push("/prototype/add_prototype")}
    >
      <Text variant="body"> Add Prototype </Text>
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
