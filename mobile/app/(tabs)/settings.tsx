import { Text } from "react-native";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>SettingsScreen</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default SettingsScreen;
