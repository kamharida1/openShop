import { Stack, useRouter, useSearchParams } from "expo-router";
import { Image } from "react-native";
import { ReButton } from "../../../etc/buttons/re_button";
import { Screen } from "../../../etc/views/screen";
import { Box, Text } from "../../../etc/_Theme";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { SubCategory } from "../../../src/models";

export default function SubCategore() {
  const { id } = useSearchParams();

  const { data, remove, navigateToUpdate } = useDataStore(SubCategory);
  
  const sub_category = data.find((cat) => cat.id === id )

  return (
    <Screen style={{ paddingTop: 2 }}>
      <Stack.Screen options={{ title: sub_category?.name }} />
      <Box flex={1} m="m">
        <Box flex={1} mt="l">
          <Text style={{ fontSize: 20 }}>{sub_category?.name}</Text>
          <Text
            style={{
              marginTop: 16,
              marginBottom: 30,
              fontSize: 16,
              color: "#303035",
            }}
          >
            {sub_category?.description}
          </Text>
          <ReButton
            variant="primary"
            label="Edit"
            onPress={() => navigateToUpdate(sub_category, "/sub_category/add_sub_category", "update")}
          />
          <ReButton
            style={{ marginTop: 20 }}
            variant="primary"
            label="Delete"
            onPress={() => remove(sub_category?.id)}
          />
        </Box>
      </Box>
    </Screen>
  );
}
