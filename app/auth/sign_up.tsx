import React, { useState } from "react";
import { View, Button } from "react-native";
import { Auth, Hub } from "aws-amplify";

import SoftTextInput from "../../etc/forms/soft_text_input";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    Auth.signUp( email, password )
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
