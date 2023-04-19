import { StyleSheet, Text, View } from "react-native";
import React from "react";

import {
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const KeyboardAvoidingWrapper: React.FC<Props> = ({ children }) => {
  return (
    <KeyboardAvoidingView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          padding: 15
        }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export { KeyboardAvoidingWrapper };

const styles = StyleSheet.create({});
