import { Link, Stack, useRouter } from "expo-router";
import { Platform, Pressable } from "react-native";
import { Box, Text } from "../../../etc/_Theme";
import { FontAwesome } from "@expo/vector-icons";


export default function SubCategoryLayout() {
  const router = useRouter();

  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="sub_categories"
        options={{
          headerLargeTitle: true,
          headerRight: AddSubCategoryButton,
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
        name="add_sub_category"
        options={{
          title: "Add Sub Category",
          presentation: "modal",
          headerRight: Platform.select({
            ios: DismissComposeButton,
          }),
        }}
      />
      <Stack.Screen
        name="add_sub_option"
        options={{
          title: "Add Sub Option",
          presentation: "modal",
          headerRight: Platform.select({
            ios: DismissComposeButton,
          }),
        }}
      />
    </Stack>
  );
}

function AddSubCategoryButton() {
  const router = useRouter();
  return (
    <Pressable
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        paddingRight: 8,
      }}
      onPress={() => router.push("/sub_category/add_sub_category")}
    >
      <Text style={{ fontSize: 14 }}> Add Sub Category </Text>
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
