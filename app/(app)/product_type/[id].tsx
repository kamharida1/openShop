import { Stack, useSearchParams } from "expo-router";
import { Image } from "react-native";
import { ReButton } from "../../../etc/buttons/re_button";
import { Screen } from "../../../etc/views/screen";
import { Box, Text } from "../../../etc/_Theme";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { ProductType  } from "../../../src/models";

export default function Product() {
  const { id } = useSearchParams();

  const { data, remove, navigateToUpdate } = useDataStore(ProductType)
  
  const product_type = data.find((prod) => prod.id === id )

  return (
    <Screen style={{ paddingTop: 2 }}>
      <Stack.Screen options={{ title: product_type?.name }} />
      <Box flex={1} m="m">
        <Box flex={1} mt="l">
          <Text style={{ fontSize: 20 }}>{product_type?.name}</Text>
          <ReButton
            variant="primary"
            label="Edit"
            onPress={() =>
              navigateToUpdate(product_type, "/product_type/add_product_type", "update")
            }
          />
          <ReButton
            style={{ marginTop: 20 }}
            variant="primary"
            label="Delete"
            onPress={() => remove(product_type?.id)}
          />
        </Box>
      </Box>
    </Screen>
  );
}
