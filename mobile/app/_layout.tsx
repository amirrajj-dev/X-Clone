import { Stack } from "expo-router";
import "../global.css"
import {ClerkProvider} from "@clerk/clerk-expo"
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { StatusBar } from "react-native";
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from "react";
import {QueryClient , QueryClientProvider} from "@tanstack/react-query"


export default function RootLayout() {
  const queryClient = new QueryClient()
   useEffect(() => {
        NavigationBar.setVisibilityAsync("hidden");
      }, []);
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{headerShown : false}}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)"  />
      </Stack>
      <StatusBar hidden={true} />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
