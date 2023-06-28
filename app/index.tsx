import { useRouter } from "expo-router";
import { Button, StyleSheet, SafeAreaView, Text, View } from "react-native";
import { Auth, DataStore } from "aws-amplify";
import { ExpoSQLiteAdapter } from "@aws-amplify/datastore-storage-adapter/ExpoSQLiteAdapter"; 
import { Amplify } from "aws-amplify";
import {
  Authenticator,
  ThemeProvider,
  Theme,
} from "@aws-amplify/ui-react-native";
import { AmplifyTheme } from "../etc/amplify_theme";

const WelcomeScreen = () => {
  const navigation = useRouter();
  return (
    
      <View style={styles.container}>
        <Text style={styles.title}>Cat X Dog</Text>
        <Text style={styles.subtitle}>Welcome</Text>
        <Button title="Cats tab" onPress={() => navigation.push("home")} />
        <Button title="Main App" onPress={() => navigation.push("(app)")} />
        <Button onPress={() => Auth.signOut()} title="Sign out" />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default WelcomeScreen;
