import { View, Text } from "react-native";
import React from "react";

const NoConversationFound = ({
  searchInputValue,
}: {
  searchInputValue: string;
}) => {
  return (
    <View className="flex-1 items-center justify-center px-10">
      <View className="bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl items-center w-full max-w-xs">
        <View className="bg-gray-200 p-4 rounded-full mb-4">
          <Text className="text-gray-500 text-2xl">🔍</Text>
        </View>
        <Text className="text-lg font-bold text-gray-800 dark:text-white text-center mb-1">
          No conversations found
        </Text>
        <Text className="text-gray-500 text-center text-sm">
          {searchInputValue
            ? `No results for "${searchInputValue}"`
            : "Start a new conversation to see it here"}
        </Text>
      </View>
    </View>
  );
};

export default NoConversationFound;
