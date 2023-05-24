import { Stack, useSearchParams } from "expo-router";
import { ReButton } from "../../../etc/buttons/re_button";
import { Screen } from "../../../etc/views/screen";
import { Box, Text } from "../../../etc/_Theme";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { OptionValue } from "../../../src/models";

export default function OptionValueDetail() {
  const { id } = useSearchParams();

  const { data, remove, navigateToUpdate } = useDataStore(OptionValue)
  
  const option_value = data.find((opt) => opt.id === id )

  return (
    <Screen style={{ paddingTop: 2 }}>
      <Stack.Screen options={{ title: option_value?.name }} />
      <Box flex={1} m="m">
        <Box flex={1} mt="l">
          <Text style={{ fontSize: 20 }}>{option_value?.name}</Text>
          <ReButton
            variant="primary"
            label="Edit"
            onPress={() =>
              navigateToUpdate(
                option_value,
                "/option_value/add_option_value",
                "update"
              )
            }
          />
          <ReButton
            style={{ marginTop: 20 }}
            variant="primary"
            label="Delete"
            onPress={() => remove(option_value?.id)}
          />
        </Box>
      </Box>
    </Screen>
  );
}
