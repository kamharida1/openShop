import { Link, Stack, useRouter } from "expo-router";
import { Platform, Pressable } from "react-native";
import { Box, Text } from "../../../etc/_Theme";
import { FontAwesome } from "@expo/vector-icons";

export const unstable_settings = {
  initialRouteName: "products",
};

export default function CategoryLayout() {
  const router = useRouter();

  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="categories"
        options={{
          title: "Categories",
          headerLargeTitle: true,
          headerRight: AddCategoryButton,
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
        name="add_category"
        options={{
          title: "Add Category",
          presentation: "modal",
          headerRight: Platform.select({
            ios: DismissComposeButton,
          }),
        }}
      />
    
    </Stack>
  );
}

function AddCategoryButton() {
  const router = useRouter();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        paddingRight: 8,
      }}
      onPress={() => router.push("/category/add_category")}
    >
      <Text style={{ fontSize: 14}}> Add Category </Text>
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
