import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const NotificationsScreen = () => {
  return (
   <SafeAreaProvider>
         <SafeAreaView>
         <Text>NotificationsScreen</Text>
         </SafeAreaView>
       </SafeAreaProvider>
  )
}

export default NotificationsScreen;