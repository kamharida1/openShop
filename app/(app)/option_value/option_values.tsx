import { Stack, useSearchParams } from "expo-router";
import { FlatList } from "react-native";
import { useMemo } from "react";
import { OptionValue } from "../../../src/models";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { StyleSheet, Text, View } from "@bacons/react-views";
import ItemCard from "../../../etc/cards/item_card";

export default function OptionValues() {
  
  const optionValues = useQueriedOptionValues();
  const {  navigateToUpdate } = useDataStore(OptionValue);

  function useQueriedOptionValues() {
    const { data: optionValues } = useDataStore(OptionValue);

    const { q } = useSearchParams<{ q: string }>();

    return useMemo(
      () =>
        optionValues.filter((item) => {
          if (!q) {
            return true;
          }
          return item.name.toLowerCase().includes(q?.toLowerCase());
        }),
      [q, optionValues]
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{ title: ` Option Values (${optionValues.length})` }}
      />

      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        scrollEventThrottle={16}
        data={optionValues}
        renderItem={({ item }) => (
          <ItemCard
            obj={item}
            onPress={() => navigateToUpdate(item, "/option_value/[id]", "")}
          />
        )}
        scrollEnabled
        onEndReachedThreshold={0.5}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        contentContainerStyle={{
          marginTop: 14,
          marginHorizontal: 16,
          backgroundColor: "fff",
          borderRadius: 10,
          paddingBottom: 60,
        }}
      />
    </View>
  );
}