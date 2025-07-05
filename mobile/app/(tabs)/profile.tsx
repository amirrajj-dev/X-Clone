import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  return (
    <SafeAreaProvider>
          <SafeAreaView>
          <Text>ProfileScreen</Text>
          </SafeAreaView>
        </SafeAreaProvider>
  )
}

export default ProfileScreen;