import { StyleSheet, Text, View } from "react-native";
import "@azure/core-asynciterator-polyfill";
import { LinkButton } from "../../etc/buttons/link_button";
import { DataStore } from "aws-amplify";
import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter";
import Toast from "react-native-root-toast";
import { ReButton } from "../../etc/buttons/re_button";
import { Screen } from "../../etc/views/screen";

DataStore.configure({
  storageAdapter: ExpoSQLiteAdapter,
});

export default function Page() {

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
  return (
    <Screen scroll style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
        <LinkButton
          link="category/categories"
          style={{ alignSelf: "center", marginTop: 16, width: 300 }}
        >
          Categories
        </LinkButton>
        <LinkButton
          link="product/products"
          style={{ alignSelf: "center", marginTop: 16, width: 300 }}
        >
          Products
        </LinkButton>
        <LinkButton
          link="brand/brands"
          style={{ alignSelf: "center", marginTop: 16, width: 300 }}
        >
          Brands
        </LinkButton>
        <LinkButton
          link="sub/subs"
          style={{ alignSelf: "center", marginTop: 16, width: 300 }}
        >
          Sub Categories
        </LinkButton>
        <LinkButton
          link="option_type/optionTypes"
          style={{ alignSelf: "center", marginTop: 16, width: 300 }}
        >
          Option Types
        </LinkButton>
        <LinkButton
          link="option_value/optionValues"
          style={{ alignSelf: "center", marginTop: 16, width: 300 }}
        >
          Option Values
        </LinkButton>
        <LinkButton
          link="product_type/product_types"
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
      </View>
    </Screen>
  );
}

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
    paddingHorizontal: 6
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
