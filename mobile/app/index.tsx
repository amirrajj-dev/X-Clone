import { View, Text, Pressable } from 'react-native'
import React from 'react'
import {useClerk} from "@clerk/clerk-expo"
const HomeScreen = () => {
    const {signOut} = useClerk()
  return (
    <View>
      <Text>HomeScreen</Text>
      <Pressable onPress={()=>signOut()} className='bg-emerald-600 rounded-md px-6 py-2 shadow-sm w-1/2 items-center justify-center'>
        <Text className='text-emerald-50'>LogOut</Text>
      </Pressable>
    </View>
  )
}

export default HomeScreen;