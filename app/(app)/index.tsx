import { StyleSheet, Text, View } from "react-native";
import "@azure/core-asynciterator-polyfill";
import { LinkButton } from "../../etc/buttons/link_button";
import { DataStore } from "aws-amplify";
import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter";
import Toast from "react-native-root-toast";
import { ReButton } from "../../etc/buttons/re_button";

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
      <View style={styles.container}>
        <View style={styles.main}>
          <Text style={styles.title}>Hello World</Text>
          <Text style={styles.subtitle}>
            This is the first page of your app.
          </Text>
          <LinkButton
            link="category/categories"
            style={{ marginTop: 16 }}
          >
            Categories
          </LinkButton>
          <LinkButton link="product/products" style={{ marginTop: 16 }}>
            Products
          </LinkButton>
          <LinkButton link="brand/brands" style={{ marginTop: 16 }}>
            Brands
          </LinkButton>
          <LinkButton link="prototype/prototypes" style={{ marginTop: 16 }}>
            Prototypes
          </LinkButton>
          <ReButton
            variant="default"
            label="Clear Datastore"
            onPress={clearDataStore}
            style={{
              marginVertical: 12,
              alignSelf: 'center',
              paddingHorizontal: 12
            }}
          />
        </View>
      </View>
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
