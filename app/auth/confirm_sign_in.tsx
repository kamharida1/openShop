import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { Auth } from "aws-amplify";
import SoftTextInput from "../../etc/forms/soft_text_input";

const ConfirmSignInScreen = () => {
  const [username, setUsername] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleConfirmSignIn = async () => {
    try {
      await Auth.confirmSignIn(username, confirmationCode);
      console.log("Sign-in confirmed");
    } catch (error) {
      console.log("Error confirming sign-in:", error);
    }
  };

  return (
    <View>
      <SoftTextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <SoftTextInput
        placeholder="Confirmation Code"
        value={confirmationCode}
        onChangeText={setConfirmationCode}
      />
      <Button title="Confirm Sign-In" onPress={handleConfirmSignIn} />
    </View>
  );
};

export default ConfirmSignInScreen;
