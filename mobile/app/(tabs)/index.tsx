import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import SignOutBtn from '../../components/SignOutBtn'

const HomeScreen = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
      <Text>HomeScreen</Text>
    <SignOutBtn/>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default HomeScreen;