import { Stack, useRouter, useSearchParams } from "expo-router";
import { Image } from "react-native";
import { ReButton } from "../../../etc/buttons/re_button";
import { Screen } from "../../../etc/views/screen";
import { Box, Text } from "../../../etc/_Theme";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { Category } from "../../../src/models";

export default function Categore() {
  const { id } = useSearchParams();

  const { data, remove, navigateToUpdate } = useDataStore(Category)
  
  const category = data.find((cat) => cat.id === id )

  return (
    <Screen style={{ paddingTop: 2 }}>
      <Stack.Screen options={{ title: category?.name }} />
      <Box flex={1} m="m">
        <Image
          source={{ uri: category?.image }}
          style={{ width: "100%", height: "50%" }}
        />
        <Box flex={1} mt="l">
          <Text style={{ fontSize: 20 }}>{category?.name}</Text>
          <Text
            style={{
              marginTop: 16,
              marginBottom: 30,
              fontSize: 16,
              color: "#303035",
            }}
          >
            {category?.description}
          </Text>
          <ReButton
            variant="primary"
            label="Edit"
            onPress={() => navigateToUpdate(category, "category", "add_category", "update")}
          />
          <ReButton
            style={{ marginTop: 20 }}
            variant="primary"
            label="Delete"
            onPress={() => remove(category?.id)}
          />
        </Box>
      </Box>
    </Screen>
  );
}
