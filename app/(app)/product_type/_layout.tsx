import { Link, Stack, useRouter } from "expo-router";
import { Platform, Pressable } from "react-native";
import {  Text } from "../../../etc/_Theme";
import { FontAwesome } from "@expo/vector-icons";

export const unstable_settings = {
  initialRouteName: "product_types",
};

export default function ProductTypeLayout() {
  const router = useRouter();

  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="product_types"
        options={{
          title: "Product Types",
          headerLargeTitle: true,
          headerRight: AddProductTypeButton,
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
        name="add_product_type"
        options={{
          title: "Add Product Type",
          presentation: "modal",
          headerRight: Platform.select({
            ios: DismissComposeButton,
          }),
        }}
      />
    </Stack>
  );
}

function AddProductTypeButton() {
  const router = useRouter();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        paddingRight: 8,
      }}
      onPress={() => router.push("/product_type/add_product_type")}
    >
      <Text style={{ fontSize: 14 }}> Add Product Type </Text>
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
