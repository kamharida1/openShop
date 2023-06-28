import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { Auth } from 'aws-amplify';
import SoftTextInput from '../../etc/forms/soft_text_input';

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");

  const handleResetPassword = async () => {
    try {
      await Auth.forgotPasswordSubmit(email, confirmationCode, newPassword);
      console.log("Password reset successful");
    } catch (error) {
      console.log("Error resetting password:", error);
    }
  };

  return (
    <View>
      <SoftTextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <SoftTextInput
        placeholder="Confirmation Code"
        value={confirmationCode}
        onChangeText={setConfirmationCode}
      />
      <SoftTextInput
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
    </View>
  );
};

export default ResetPasswordScreen;