import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { CONVERSATIONS, ConversationType } from "@/data/conversations";
import { Feather } from "@expo/vector-icons";
import DeleteConversationModal from "@/components/modals/DeleteConversationModal";
import NoConversationFound from "@/components/NoConversationFound";
import ChatModal from "@/components/modals/ChatModal";

const MessagesScreen = () => {
  const [converstaions, setConversations] = useState(CONVERSATIONS);
  const [filteredConversations, setFilteredConversations] =
    useState(CONVERSATIONS);
  const [isDeleteConversationModalVisible, setIsDeleteConversationModalVisible] = useState(false);
  const [isChatModalVisible , setIsChatModalVisible] = useState(false)
  const [userToDelete, setUserToDelete] = useState<ConversationType | null>(
    null
  );
  const [selectedChat , setSelectedChat] = useState<ConversationType | null>(null)
  const [searchInputValue, setSearchInputValue] = useState<string>("");

  const enterDeleteUserMode = (id: string) => {
    const userToDelete = converstaions.find(
      (c) => c.id.toString() === id.toString()
    );
    if (userToDelete) {
      setUserToDelete(userToDelete);
      setIsDeleteConversationModalVisible(true);
    } else {
      Alert.alert("Error", "User not found");
    }
  };

  const handleDelete = () => {
    if (!userToDelete) return;
    setConversations((prev) =>
      prev.filter((c) => c.id.toString() !== userToDelete.id.toString())
    );
    setIsDeleteConversationModalVisible(false);
  };

  useEffect(() => {
    if (searchInputValue.trim().length > 0) {
      const filtered = converstaions.filter(
        (c) =>
          c.user.name.toLowerCase().includes(searchInputValue.toLowerCase()) ||
          c.user.username.toLowerCase().includes(searchInputValue.toLowerCase())
      );
      if (filtered.length > 0) {
        setFilteredConversations(filtered);
      } else {
        setFilteredConversations([]);
      }
    } else {
      setFilteredConversations(converstaions);
    }
  }, [searchInputValue, converstaions]);

  const onSelectChat = (id : string)=>{
    const chat = converstaions.find((c) =>c.id.toString() === id.toString())
    if(chat){
      setSelectedChat(chat)
      setIsChatModalVisible(true)
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-white dark:bg-gray-900 px-4">
        {/* Header */}
        <View className="flex flex-row items-center justify-between pt-4 pb-2">
          <Text className="font-bold text-3xl text-gray-900 dark:text-white">Messages</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Feather name="edit" size={24} color="#3b82f6" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 rounded-full px-5 py-3 my-4">
          <Feather name="search" size={20} color="#6b7280" className="mr-3" />
          <TextInput
            value={searchInputValue}
            onChangeText={(text) => setSearchInputValue(text)}
            placeholder="Search for people and groups"
            placeholderTextColor="#9ca3af"
            className="flex-1 text-gray-900 dark:text-white text-base"
            clearButtonMode="while-editing"
          />
        </View>

        {/* Conversations List */}
        {filteredConversations.length > 0 ? (
          <FlatList
            data={filteredConversations}
            keyExtractor={({ id }) => String(id)}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View className="h-[1px] bg-gray-100 dark:bg-gray-700 mx-16" />
            )}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                className="flex flex-row py-4 items-center"
                onLongPress={() => enterDeleteUserMode(item.id.toString())}
                onPress={()=>onSelectChat(item.id.toString())}
              >
                {/* Avatar with online indicator */}
                <View className="relative mr-3">
                  <Image
                    source={{ uri: item.user.avatar }}
                    className="w-14 h-14 rounded-full"
                  />
                  {item.isOnline && (
                    <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                  )}
                </View>

                {/* Message content */}
                <View className="flex-1">
                  <View className="flex flex-row justify-between items-start">
                    <View>
                     <View className="flex-row items-center gap-2">
                       <Text className="font-bold text-gray-900 dark:text-white text-[16px]">
                        {item.user.name}
                      </Text>
                      {item.user.verified && (
                        <Feather name="check-circle" size={16} color="#34c759" />
                      )}
                     </View>
                      <Text className="text-gray-500 dark:text-gray-400 text-sm">
                        @{item.user.username}
                      </Text>
                    </View>
                    <Text className="text-gray-400 dark:text-gray-500 text-xs">{item.time}</Text>
                  </View>

                  <Text
                    className="text-gray-500 dark:text-gray-400 mt-1 text-sm"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.lastMessage}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <NoConversationFound searchInputValue={searchInputValue} />
        )}
        <View className="items-center justify-center bg-gray-200 dark:bg-gray-700 py-2 rounded-md shadow-sm">
          <Text className="text-sm text-gray-500 dark:text-gray-300 font-semibold">
            Tap To Open - Long Press To Delete
          </Text>
        </View>
        <DeleteConversationModal
          visible={isDeleteConversationModalVisible}
          onDismiss={() => setIsDeleteConversationModalVisible(false)}
          onConfirm={handleDelete}
          userName={userToDelete?.user.name}
        />
        {isChatModalVisible && (
          <ChatModal visible={isChatModalVisible} onClose={()=>setIsChatModalVisible(false)} chat={selectedChat as ConversationType} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default MessagesScreen;