import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import "@azure/core-asynciterator-polyfill";
import { LinkButton } from "../etc/buttons/link_button";
import { DataStore } from "aws-amplify";
import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter";
import Toast from "react-native-root-toast";
import { ReButton } from "../etc/buttons/re_button";
import { Screen } from "../etc/views/screen";
import { useAuthenticator, withAuthenticator } from "@aws-amplify/ui-react-native";

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

DataStore.configure({
  storageAdapter: ExpoSQLiteAdapter,
});

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

function Page() {
  const circleSize = useSharedValue(100);

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

  return (
    <Screen scroll style={styles.container}>
      <View style={styles.main}>
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
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
        <LinkButton
          link="(app)/category/categories"
          style={{ alignSelf: "center", marginTop: 16, width: 300 }}
        >
          Categories
        </LinkButton>
        <LinkButton
          link="(app)/prototype/prototypes"
          style={{ alignSelf: "center", marginTop: 16, width: 300 }}
        >
          Prototypes
        </LinkButton>
        <LinkButton
          link="(app)/product/products"
          style={{ alignSelf: "center", marginTop: 16, width: 300 }}
        >
          Products
        </LinkButton>
        <LinkButton
          link="(app)/brand/brands"
          style={{ alignSelf: "center", marginTop: 16, width: 300 }}
        >
          Brands
        </LinkButton>
        <LinkButton
          link="(app)/sub_category/sub_categories"
          style={{ alignSelf: "center", marginTop: 16, width: 300 }}
        >
          Sub Categories
        </LinkButton>
        <LinkButton
          link="(app)/option_type/option_types"
          style={{ alignSelf: "center", marginTop: 16, width: 300 }}
        >
          Option Types
        </LinkButton>
        <LinkButton
          link="(app)/option_value/option_values"
          style={{ alignSelf: "center", marginTop: 16, width: 300 }}
        >
          Option Values
        </LinkButton>
        <LinkButton
          link="(app)/product_type/product_types"
          style={{ alignSelf: "center", marginTop: 16, width: 300 }}
        >
          ProductTypes
        </LinkButton>
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
            // backgroundColor: "transparent",
            width: 300,
          }}
        />
        <SignOutButton />
      </View>
    </Screen>
  );
}

export default withAuthenticator(Page)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "flex-start",
    maxWidth: 960,
    marginHorizontal: "auto",
    paddingTop: 40,
    paddingHorizontal: 6,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    color: "#38434D",
  },
});