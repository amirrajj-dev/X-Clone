import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const MessagesScreen = () => {
  return (
   <SafeAreaProvider>
         <SafeAreaView>
         <Text>MessagesScreen</Text>
         </SafeAreaView>
       </SafeAreaProvider>
  )
}

export default MessagesScreen;