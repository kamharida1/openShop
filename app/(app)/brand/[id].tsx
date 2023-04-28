import { Stack, useSearchParams } from "expo-router";
import { ReButton } from "../../../etc/buttons/re_button";
import { Screen } from "../../../etc/views/screen";
import { Box, Text } from "../../../etc/_Theme";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { Brand } from "../../../src/models";

export default function BrandDetail() {
  const { id } = useSearchParams();

  const { data, remove, navigateToUpdate } = useDataStore(Brand)
  
  const brand = data.find((brand) => brand.id === id )

  return (
    <Screen style={{ paddingTop: 2 }}>
      <Stack.Screen options={{ title: brand?.name }} />
      <Box flex={1} m="m">
        <Box flex={1} mt="l">
          <Text style={{ fontSize: 20 }}>{brand?.name}</Text>
          <ReButton
            variant="primary"
            label="Edit"
            onPress={() =>
              navigateToUpdate(brand, "/brand/add_brand", "update")
            }
          />
          <ReButton
            style={{ marginTop: 20 }}
            variant="primary"
            label="Delete"
            onPress={() => remove(brand?.id)}
          />
        </Box>
      </Box>
    </Screen>
  );
}
