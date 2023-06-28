import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import { Auth, Hub } from "aws-amplify";
import SoftTextInput from "../../etc/forms/soft_text_input";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Subscribe to authentication events
    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      if (payload.event === "signIn") {
        console.log("User signed in:", payload.data);
      } else if (payload.event === "signOut") {
        console.log("User signed out");
      }
    });

    // Clean up the subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignIn = () => {
    Auth.signIn(email, password);
  };

  const handleForgotPassword = () => {
    // Navigation.navigate
  }

  return (
    <View>
      <SoftTextInput label="Email" value={email} onChangeText={setEmail} />
      <SoftTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Forgot Password" onPress={handleForgotPassword} />
    </View>
  );
};

export default LoginScreen;
