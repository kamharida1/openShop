import { Stack, useSearchParams } from "expo-router";
import { FlatList } from "react-native";
import { useMemo } from "react";
import { Brand } from "../../../src/models";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { StyleSheet, Text, View } from "@bacons/react-views";
import ItemCard from "../../../etc/cards/item_card";

export default function Brands() {
  
  const brands = useQueriedBrands();
  const {  navigateToUpdate } = useDataStore(Brand);

  function useQueriedBrands() {
    // const categories = useAppSelector(selectAllCategories);
    const { data: brands } = useDataStore(Brand);

    const { q } = useSearchParams<{ q: string }>();

    return useMemo(
      () =>
        brands.filter((item) => {
          if (!q) {
            return true;
          }
          return item.name.toLowerCase().includes(q?.toLowerCase());
        }),
      [q, brands]
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{ title: ` Brands (${brands.length})` }}
      />

      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        scrollEventThrottle={16}
        data={brands}
        renderItem={({ item }) => (
          <ItemCard
            obj={item}
            onPress={() => navigateToUpdate(item, "/brand/[id]", "")}
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