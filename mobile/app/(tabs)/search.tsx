import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const SearchScreen = () => {
  return (
  <SafeAreaProvider>
        <SafeAreaView>
        <Text>SearchScreen</Text>
        </SafeAreaView>
      </SafeAreaProvider>
  )
}

export default SearchScreen;