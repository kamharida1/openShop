import { Stack, useRouter, useSearchParams } from "expo-router";
import { Image } from "react-native";
import { ReButton } from "../../../etc/buttons/re_button";
import { Screen } from "../../../etc/views/screen";
import { Box, Text } from "../../../etc/_Theme";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { OptionType } from "../../../src/models";

export default function Categore() {
  const { id } = useSearchParams();

  const { data, remove, navigateToUpdate } = useDataStore(OptionType)
  
  const optionType = data.find((opt) => opt.id === id )

  return (
    <Screen style={{ paddingTop: 2 }}>
      <Stack.Screen options={{ title: optionType?.name }} />
      <Box flex={1} m="m">
        <Box flex={1} mt="l">
          <Text style={{ fontSize: 20 }}>{optionType?.name}</Text>
          <ReButton
            variant="primary"
            label="Edit"
            onPress={() => navigateToUpdate(optionType, "/option_type/add_option_type", "update")}
          />
          <ReButton
            style={{ marginTop: 20 }}
            variant="primary"
            label="Delete"
            onPress={() => remove(optionType?.id)}
          />
        </Box>
      </Box>
    </Screen>
  );
}
