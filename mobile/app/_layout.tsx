import { Stack } from "expo-router";
import "../global.css"
import {ClerkProvider} from "@clerk/clerk-expo"
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { StatusBar } from "react-native";
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from "react";

export default function RootLayout() {
   useEffect(() => {
        NavigationBar.setVisibilityAsync("hidden");
      }, []);
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <Stack screenOptions={{headerShown : false}}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)"  />
      </Stack>
      <StatusBar hidden={true} />
    </ClerkProvider>
  );
}
