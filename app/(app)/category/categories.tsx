import CategoryCard from "../../../etc/cards/category_card";
import { useRouter, useSearchParams } from "expo-router";
import { FlatList, TouchableOpacity } from "react-native";
import { useEffect, useMemo } from "react";
import { Category } from "../../../src/models";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { StyleSheet, Text, View } from "@bacons/react-views";

export default function Categories() {
  
  const categories = useQueriedCategories();
  const {  navigateToUpdate } = useDataStore(Category);

  function useQueriedCategories() {
    // const categories = useAppSelector(selectAllCategories);
    const { data: categories } = useDataStore(Category);

    const { q } = useSearchParams<{ q: string }>();

    return useMemo(
      () =>
        categories.filter((item) => {
          if (!q) {
            return true;
          }
          return item.name.toLowerCase().includes(q?.toLowerCase());
        }),
      [q, categories]
    );
  }

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      scrollEventThrottle={16}
      data={categories}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigateToUpdate(item, "product_types", "[id]", "")}
        >
          <Text>{item.name}</Text>
        </TouchableOpacity>
      )}
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
