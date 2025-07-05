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
    <SafeAreaView className="flex-1 bg-white">
      {/* Search Header */}
      <View className="px-4 pt-2 pb-3 border-b border-slate-200">
        <View className="flex-row items-center bg-slate-100 rounded-full px-4 py-2">
          <Feather name='search' size={20} className="text-slate-500 mr-2" />
          <TextInput 
            placeholder='Search Twitter' 
            className="flex-1 text-slate-900 placeholder:text-gray-400 text-base py-0"
          />
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-4">
        {/* Trends Section */}
        <View className="mt-6">
          <Text className="text-xl font-extrabold text-slate-900 mb-4">Trends for you</Text>
           <FlatList 
            data={trends}
            keyExtractor={({id}) => String(id)}
            renderItem={({item}) => (
              <TouchableOpacity 
                className="py-3 border-b border-slate-100"
                activeOpacity={0.7}
              >
                <View className="flex-row justify-between mb-1">
                  <Text className="text-xs text-slate-500">{item.category} · Trending</Text>
                </View>
                <Text className="text-base font-semibold text-slate-900 mb-1">#{item.trending}</Text>
                <Text className="text-xs text-slate-500">{item.tweets}K Tweets</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen;