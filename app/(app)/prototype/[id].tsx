import { Stack, useRouter, useSearchParams } from "expo-router";
import { Image } from "react-native";
import { ReButton } from "../../../etc/buttons/re_button";
import { Screen } from "../../../etc/views/screen";
import { Box, Text } from "../../../etc/_Theme";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { Prototype } from "../../../src/models";

export default function Prototypee() {
  const { id } = useSearchParams();

  const { data, remove, navigateToUpdate } = useDataStore(Prototype)
  
  const prototype = data.find((proto) => proto.id === id )

  return (
    <Screen style={{ paddingTop: 2 }}>
      <Stack.Screen options={{ title: prototype?.name }} />
      <Box flex={1} m="m">
        <Box flex={1} mt="l">
          <Text style={{ fontSize: 20 }}>{prototype?.name}</Text>
          <ReButton
            variant="primary"
            label="Edit"
            onPress={() => navigateToUpdate(prototype, "/prototype/add_prototype", "update")}
          />
          <ReButton
            style={{ marginTop: 20 }}
            variant="primary"
            label="Delete"
            onPress={() => remove(prototype?.id)}
          />
        </Box>
      </Box>
    </Screen>
  );
}
