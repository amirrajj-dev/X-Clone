import { View, Text, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const SearchScreen = () => {
  const trends = [
    {id: 1, trending: "ReactNative", tweets: 125, category: "Technology"},
    {id: 2, trending: "TypeScript", tweets: 112, category: "Programming"},
    {id: 3, trending: "WebDevelopment", tweets: 234, category: "Technology"},
    {id: 4, trending: "AI", tweets: 167, category: "Innovation"},
    {id: 5, trending: "TechNews", tweets: 91, category: "News"},
    {id: 6, trending: "UXDesign", tweets: 78, category: "Design"},
    {id: 7, trending: "Startups", tweets: 143, category: "Business"}
  ];

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      {/* Search Header */}
      <View className="px-4 pt-2 pb-3 border-b border-slate-200 dark:border-gray-800">
        <View className="flex-row items-center bg-slate-100 dark:bg-gray-800 rounded-full px-4 py-2">
          <Feather name='search' size={20} color={"#4b5563"} className="mr-2" />
          <TextInput 
            placeholder='Search Twitter' 
            placeholderTextColor="#9ca3af"
            className="flex-1 text-slate-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-base py-0"
          />
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-4">
        {/* Trends Section */}
        <View className="mt-6">
          <Text className="text-xl font-extrabold text-slate-900 dark:text-white mb-4">Trends for you</Text>
           <FlatList 
            data={trends}
            keyExtractor={({id}) => String(id)}
            renderItem={({item}) => (
              <TouchableOpacity 
                className="py-3 border-b border-slate-100 dark:border-gray-800"
                activeOpacity={0.7}
              >
                <View className="flex-row justify-between mb-1">
                  <Text className="text-xs text-slate-500 dark:text-gray-400">{item.category} · Trending</Text>
                  <MaterialIcons name="more-vert" size={16} color="#9ca3af" />
                </View>
                <Text className="text-base font-semibold text-slate-900 dark:text-white mb-1">#{item.trending}</Text>
                <Text className="text-xs text-slate-500 dark:text-gray-400">{item.tweets}K Tweets</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen;