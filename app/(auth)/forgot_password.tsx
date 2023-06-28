import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { Auth } from "aws-amplify";
import SoftTextInput from "../../etc/forms/soft_text_input";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    try {
      await Auth.forgotPassword(email);
      console.log("Forgot password request initiated");
    } catch (error) {
      console.log("Error initiating forgot password:", error);
    }
  };

  return (
    <View>
      <SoftTextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Forgot Password" onPress={handleForgotPassword} />
    </View>
  );
};

export default ForgotPasswordScreen;
