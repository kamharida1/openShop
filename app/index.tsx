import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "@azure/core-asynciterator-polyfill";
import { LinkButton, data } from "../etc/buttons/link_button";
import { DataStore } from "aws-amplify";
import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter";
import Toast from "react-native-root-toast";
import { ReButton } from "../etc/buttons/re_button";
import { useAuthenticator, withAuthenticator } from "@aws-amplify/ui-react-native";
import tw from 'twrnc'

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { FlatList } from "react-native-gesture-handler";


DataStore.configure({
  storageAdapter: ExpoSQLiteAdapter,
});

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

function Page() {
  const circleSize = useSharedValue(100);

  const router = useRouter();

  async function clearDataStore() {
    await DataStore.clear();
    Toast.show("Storage cleared, pull to refresh", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM + 1,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }

  function onPress() {
    circleSize.value = withSpring(
      Math.floor(Math.random() * (350 - 100 + 1)) + 100,
      {
        damping: 5,
        stiffness: 80,
      }
    );
  }

  const animatedStyle = useAnimatedStyle(() => {
    return { width: circleSize.value, height: circleSize.value };
  });

  const renderItem = ({ item }: any) => (
    <LinkButton
      title={item.title}
      link={item.link}
      style={item.style}
    />
  )

  const renderHeader = () => (
     <View style={tw`items-center`}>
        <Pressable onPress={onPress}>
          <Animated.View
            style={[
              {
                alignSelf: "center",
                marginVertical: 6,
                backgroundColor: "blue",
                borderRadius: 50,
              },
              animatedStyle,
            ]}
          />
        </Pressable>
        <Text style={tw`text-3xl font-bold text-center text-neutral-900`}>Hello World</Text>
        <Text style={tw`text-xl font-medium text-center text-neutral-400 `}>This is the first page of your app.</Text>
        <Pressable
          onPress={() => router.push("(app)/misc")}
          style={tw` w-70 my-4 bg-blue-500 py-2 px-4 rounded-md shadow`}
        >
          <Text style={tw`text-center text-white text-lg font-semibold`}>
            Misc
          </Text>
        </Pressable>
      </View>
  )

  const renderFooter = () => (
    <View>
       <ReButton
          variant="default"
          label="Clear Datastore"
          onPress={clearDataStore}
          style={{
            marginVertical: 12,
            alignSelf: "center",
            paddingHorizontal: 12,
            borderWidth: 2,
            borderColor: "#010127",
            width: 300,
          }}
        />
        <SignOutButton />
    </View>
  )

  return (
    <View style={tw`flex-1 items-center justify-center bg-white`}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={tw`pt-8 pb-16`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default withAuthenticator(Page)
