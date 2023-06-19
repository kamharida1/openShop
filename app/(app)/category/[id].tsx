import { Stack, useSearchParams } from "expo-router";
import { Image, Pressable, View } from "react-native";
import { Screen } from "../../../etc/views/screen";
import { Text } from "../../../etc/_Theme";
import { useDataStore } from "../../../src/hooks/useDataStoreUpdate";
import { Category } from "../../../src/models";
import tw from 'twrnc'

export default function Categore() {
  const { id } = useSearchParams();

  const { data, remove, navigateToUpdate } = useDataStore(Category)
  
  const category = data.find((cat) => cat.id === id )

  return (
    <Screen style={{ paddingTop: 2 }}>
      <Stack.Screen options={{ title: category?.name }} />
      <View
        style={tw`flex-1 items-center bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800`}
      >
        <Image
          source={{ uri: category?.image }}
          style={tw`w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto`}
        />
        <Text
          style={tw`pt-6 md:p-8 text-3xl text-center md:text-left font-medium`}
        >
          {category?.name}
        </Text>
        <Text
          style={tw`pt-3 md:p-8 text-center md:text-left text-lg font-medium`}
        >
          {category?.description}
        </Text>
        <Pressable
          onPress={() =>
            navigateToUpdate(category, "/category/add_category", "update")
          }
          style={tw`rounded-xl my-4 w-48 h-16 bg-lime-100 items-center justify-center`}
        >
          <Text style={tw`text-sky-500 dark:text-sky-400`}>Edit</Text>
        </Pressable>
        <Pressable
          onPress={() => remove(category?.id)}
          style={tw`rounded-lg my-4 w-48 h-16 bg-slate-900 items-center justify-center`}
        >
          <Text style={tw`text-slate-100 dark:text-slate-500`}>Delete</Text>
        </Pressable>
      </View>
    </Screen>
  );
}

{/* <Box flex={1} m="m">
  <Image
    source={{ uri: category?.image }}
    style={{ width: "100%", height: "50%" }}
  />
  <Box flex={1} mt="l">
    <Text style={{ fontSize: 20 }}>{category?.name}</Text>
    <Text
      style={{
        marginTop: 16,
        marginBottom: 30,
        fontSize: 16,
        color: "#303035",
      }}
    >
      {category?.description}
    </Text>
    <ReButton
      variant="primary"
      label="Edit"
      onPress={() =>
        navigateToUpdate(category, "/category/add_category", "update")
      }
    />
    <ReButton
      style={{ marginTop: 20 }}
      variant="primary"
      label="Delete"
      onPress={() => remove(category?.id)}
    />
  </Box>
</Box>; */}
