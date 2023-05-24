import { useSearchParams } from "expo-router";
import { Button, FlatList, TouchableOpacity } from "react-native";
import { useMemo } from "react";
import { ProductType } from "../../../src/models";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { StyleSheet, Text, View } from "@bacons/react-views";
import ItemCard from "../../../etc/cards/item_card";
import { DataStore } from "aws-amplify";

export default function ProductTypes() {
  
  const product_types = useQueriedProductTypes();
  const {  navigateToUpdate } = useDataStore(ProductType);

  function useQueriedProductTypes() {
    const { data: product_types } = useDataStore(ProductType);

    const { q } = useSearchParams<{ q: string }>();

    return useMemo(
      () =>
        product_types.filter((item) => {
          if (!q) {
            return true;
          }
          return item.name.toLowerCase().includes(q?.toLowerCase());
        }),
      [q, product_types]
    );
  }

  const load = async () => {
    product_types.map((item) => {
      DataStore.save(
        new ProductType({
          name: item.name,
          
        })
      );
    });

    await Promise.all(product_types);
  };

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      scrollEventThrottle={16}
      data={product_types}
      renderItem={({ item }) => (
        <ItemCard
          obj={item}
          onPress={() => navigateToUpdate(item, "/product_type/[id]", "")}
        />
      )}
      scrollEnabled
      onEndReachedThreshold={0.5}
      stickyHeaderIndices={[0]}
      stickyHeaderHiddenOnScroll
      contentContainerStyle={{ marginTop: 14 }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: 12,
  }
})
