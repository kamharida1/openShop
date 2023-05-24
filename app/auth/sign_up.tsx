import React, { useState } from "react";
import { View, Button } from "react-native";
import { signUp } from "../../src/functions/Auth";
import SoftTextInput from "../../etc/forms/soft_text_input";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    signUp( email, password )
    console.log("Sign Up:", email, password);
  };

  return (
    <View>
      <SoftTextInput label="Email" value={email} onChangeText={setEmail} />
      <SoftTextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignUpScreen;
