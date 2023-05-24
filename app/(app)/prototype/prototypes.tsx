import { Stack, useSearchParams } from "expo-router";
import { FlatList, TouchableOpacity } from "react-native";
import { useMemo } from "react";
import { Category, Prototype } from "../../../src/models";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import ItemCard from "../../../etc/cards/item_card";
import { View } from "@bacons/react-views";
import { DataStore } from "aws-amplify";
import { Button } from "react-native";

export default function Prototypes() {
  
  const prototypes = useQueriedPrototypes();
  const {  navigateToUpdate } = useDataStore(Prototype);

  function useQueriedPrototypes() {
    const { data: prototypes } = useDataStore(Prototype);

    const { q } = useSearchParams<{ q: string }>();

    return useMemo(
      () =>
        prototypes.filter((item) => {
          if (!q) {
            return true;
          }
          return item.name.toLowerCase().includes(q?.toLowerCase());
        }),
      [q, prototypes]
    );
  }

  const load = async () => {
    prototypes.map((item) => {
      DataStore.save(
        new Prototype({
          name: item.name,
          categoryID: item.categoryID
        })
      );
    });

    await Promise.all(prototypes);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: ` Prototypes (${prototypes.length})` }} />

      <FlatList
        contentInsetAdjustmentBehavior="automatic"
        scrollEventThrottle={16}
        data={prototypes}
        renderItem={({ item }) => (
          <ItemCard
            obj={item}
            onPress={() => navigateToUpdate(item, "/prototype/[id]", "")}
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

