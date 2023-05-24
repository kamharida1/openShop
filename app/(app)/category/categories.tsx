import { Stack, useSearchParams } from "expo-router";
import { FlatList, TouchableOpacity } from "react-native";
import { useMemo } from "react";
import { Category } from "../../../src/models";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import ItemCard from "../../../etc/cards/item_card";
import { View } from "@bacons/react-views";
import { DataStore } from "aws-amplify";
import { Button } from "react-native";
import { Loading } from "../../../etc/errors/loading";

export default function Categories() {
  
  const categories = useQueriedCategories();
  const { navigateToUpdate, loading } = useDataStore(Category);

  function useQueriedCategories() {
    const { data: categories, } = useDataStore(Category);

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

  const load = async () => {
    categories.map((item) => {
      DataStore.save(
        new Category({
          name: item.name,
          description: item.description,
          image: item.image,
          producttypeID: item.producttypeID
        })
      );
    });

    await Promise.all(categories);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: ` Categories (${categories.length})` }} />
      {loading && <Loading />}
      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        scrollEventThrottle={16}
        data={categories}
        renderItem={({ item }) => (
          <ItemCard
            obj={item}
            onPress={() => navigateToUpdate(item, "/category/[id]", "")}
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

