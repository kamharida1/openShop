import { Stack, useSearchParams } from "expo-router";
import { Button, FlatList, TouchableOpacity } from "react-native";
import { useMemo } from "react";
import { Category, SubCategory } from "../../../src/models";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import ItemCard from "../../../etc/cards/item_card";
import { View } from "@bacons/react-views";
import { DataStore } from "aws-amplify";

export default function SubCategories() {
  
  // const categories = useQueriedCategories();
  const sub_categories = useQueriedSubCategories()
  const {  navigateToUpdate } = useDataStore(Category);

  function useQueriedSubCategories() {
    const { data: sub_categories } = useDataStore(SubCategory);

    const { q } = useSearchParams<{ q: string }>();

    return useMemo(
      () =>
        sub_categories.filter((item) => {
          if (!q) {
            return true;
          }
          return item.name.toLowerCase().includes(q?.toLowerCase());
        }),
      [q, sub_categories]
    );
  }

  const load = async () => {
    sub_categories.map((item) => {
      DataStore.save(
        new SubCategory({
          name: item.name,
          categoryID: item.categoryID,
        })
      );
    });

    await Promise.all(sub_categories);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{ title: ` Sub Categories (${sub_categories.length})` }}
      />
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        scrollEventThrottle={16}
        data={sub_categories}
        renderItem={({ item }) => (
          <ItemCard
            obj={item}
            onPress={() => navigateToUpdate(item, "/sub_category/[id]", "")}
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

