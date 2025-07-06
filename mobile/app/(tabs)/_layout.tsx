import { Redirect, Tabs } from 'expo-router'
import React from 'react'
import {Feather} from "@expo/vector-icons"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useAuth } from '@clerk/clerk-expo'
import { useColorScheme } from 'react-native'

const TabsLayout = () => {
    const inset = useSafeAreaInsets()
    const {isSignedIn} = useAuth()
    const colorScheme = useColorScheme()
    
    if (!isSignedIn) return <Redirect href={'/(auth)'} />
  
    return (
    <Tabs 
    screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: colorScheme === 'dark' ? "#9ca3af" : "#6b7280",
        tabBarStyle: {
            backgroundColor: colorScheme === 'dark' ? "#1f2937" : "#fff",
            height: 70 + inset.bottom,
            paddingTop: 15
        }
    }}
    >
        <Tabs.Screen 
        name='index' 
        options={{
            title: "",
            tabBarIcon: ({color, size}) => <Feather name='home' color={color} size={size}/>
        }}
        />
        <Tabs.Screen 
        name='search' 
        options={{
            title: "",
            tabBarIcon: ({color, size}) => <Feather name='search' color={color} size={size}/>
        }}
        />
        <Tabs.Screen 
        name='notifications' 
        options={{
            title: "",
            tabBarIcon: ({color, size}) => <Feather name='bell' color={color} size={size}/>
        }}
        />
        <Tabs.Screen 
        name='messages' 
        options={{
            title: "",
            tabBarIcon: ({color, size}) => <Feather name='mail' color={color} size={size}/>
        }}
        />
        <Tabs.Screen 
        name='profile' 
        options={{
            title: "",
            tabBarIcon: ({color, size}) => <Feather name='user' color={color} size={size}/>
        }}
        />
    </Tabs>
  )
}

export default TabsLayout