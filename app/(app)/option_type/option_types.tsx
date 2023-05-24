import { Stack, useSearchParams } from "expo-router";
import { Button, FlatList, TouchableOpacity } from "react-native";
import { useMemo } from "react";
import { OptionType } from "../../../src/models";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import ItemCard from "../../../etc/cards/item_card";
import { View } from "@bacons/react-views";
import { DataStore } from "aws-amplify";

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

  const onSave = async () => {
    // const options = option_types.map((item) => new OptionType(item));
    // await DataStore.save(options)
    //   .then(() => console.log("Items saved successfully"))
    //   .catch((error) => console.error("Error saving items", error));
  };

  const load = async () => {
      //const promises = [];
      // for (let i = 0; i < option_types.length; i++) {
      //   promises.push(
      //     DataStore.save(
      //       new OptionType({
      //         name: _.sample(adjectives).concat(" ").concat(_.sample(names)),
      //         price: parseFloat(_.random(2.5, 9.9).toFixed(2)),
      //         sku: moment().format("x"),
      //         image: _.sample(images),
      //       })
      //     )
      //   );
      // }
    option_types.map((item) => {
      DataStore.save(
        new OptionType({
          name: item.name,
          placeholder: item.placeholder,
          category: item.category,
          value: item.value
        })
      )
    })
    
      await Promise.all(option_types);
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{ title: ` Option Types (${option_types.length})` }}
      />
      <>
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
            flexGrow: 1,
            marginTop: 14,
            marginHorizontal: 16,
            backgroundColor: "fff",
            borderRadius: 10,
            paddingBottom: 60,
          }}
        />
      </>
    </View>
  );
}

