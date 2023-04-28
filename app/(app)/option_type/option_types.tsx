import { Stack, useSearchParams } from "expo-router";
import { FlatList, TouchableOpacity } from "react-native";
import { useMemo } from "react";
import { OptionType } from "../../../src/models";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import ItemCard from "../../../etc/cards/item_card";
import { View } from "@bacons/react-views";

export default function OptionTypes() {
  
  const option_types = useQueriedOptionTypes();
  const {  navigateToUpdate } = useDataStore(OptionType);

  function useQueriedOptionTypes() {
    const { data: option_types } = useDataStore(OptionType);

    const { q } = useSearchParams<{ q: string }>();

    return useMemo(
      () =>
        option_types.filter((item) => {
          if (!q) {
            return true;
          }
          return item.name.toLowerCase().includes(q?.toLowerCase());
        }),
      [q, option_types]
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{ title: ` Option Types (${option_types.length})` }}
      />

      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        scrollEventThrottle={16}
        data={option_types}
        renderItem={({ item }) => (
          <ItemCard
            obj={item}
            onPress={() => navigateToUpdate(item, "/option_type/[id]", "")}
          />
        )}
        scrollEnabled
        onEndReachedThreshold={0.5}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        contentContainerStyle={{
          flex: 1,
          marginTop: 14,
          marginHorizontal: 16,
          backgroundColor: "fff",
          borderRadius: 10,
        }}
      />
    </View>
  );
}

