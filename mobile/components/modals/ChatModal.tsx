import { ConversationType } from "@/data/conversations";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing
} from "react-native";

interface ChatModalProps {
  visible: boolean;
  onClose: () => void;
  chat: ConversationType;
}

const ChatModal: React.FC<ChatModalProps> = ({ visible, onClose, chat }) => {
  const [message, setMessage] = useState("");
  const [sendButtonScale] = useState(new Animated.Value(1));

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Animation when sending
    Animated.sequence([
      Animated.timing(sendButtonScale, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(sendButtonScale, {
        toValue: 1,
        duration: 200,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
    ]).start();
    setMessage("");
    //?TODO : Send message
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="slide"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 bg-white dark:bg-gray-900"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <View className="flex-row items-center gap-4">
            <TouchableOpacity
              onPress={onClose}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={20} color="#3b82f6" />
            </TouchableOpacity>
            
            <View className="flex-row items-center gap-3">
              <View className="relative">
                <Image
                  source={{ uri: chat?.user?.avatar }}
                  className="w-10 h-10 rounded-full"
                />
                {chat.isOnline && (
                  <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                )}
              </View>
              <View>
                <Text className="font-bold text-gray-900 dark:text-white">
                  {chat.user.name}
                </Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">
                  @{chat.user.username}
                </Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity activeOpacity={0.7}>
            <Ionicons name="ellipsis-vertical" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Chat Messages */}
        <FlatList
          data={chat.messages}
          keyExtractor={({ id }) => String(id)}
          contentContainerStyle={{ padding: 16 }}
          inverted
          renderItem={({ item }) => (
            <View
              className={`flex-row items-start mb-4 ${item.fromUser ? "justify-end" : "justify-start"}`}
            >
              {!item.fromUser && (
                <Image
                  source={{ uri: chat.user.avatar }}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              
              <View className={`max-w-[80%] ${item.fromUser ? "items-end" : "items-start"}`}>
                <View
                  className={`p-3 rounded-2xl ${item.fromUser 
                    ? "bg-blue-500 rounded-tr-none" 
                    : "bg-gray-100 dark:bg-gray-800 rounded-tl-none"
                  }`}
                >
                  <Text className={`${item.fromUser ? "text-white" : "text-gray-900 dark:text-gray-100"}`}>
                    {item.text}
                  </Text>
                </View>
                <Text className="text-xs text-gray-400 mt-1">
                  {item.time}
                </Text>
              </View>
            </View>
          )}
        />

        {/* Message Input */}
        <View className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              activeOpacity={0.7}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
            >
              <Ionicons name="add" size={24} color="#3b82f6" />
            </TouchableOpacity>
            
            <TextInput
              placeholder="Type a message..."
              placeholderTextColor="#9ca3af"
              className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full px-4 py-3"
              value={message}
              onChangeText={setMessage}
              multiline
            />
            
            <Animated.View style={{ transform: [{ scale: sendButtonScale }] }}>
              <TouchableOpacity
                onPress={handleSend}
                activeOpacity={0.7}
                className={`p-3 rounded-full ${message.trim() ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700"}`}
                disabled={!message.trim()}
              >
                <Ionicons 
                  name="send" 
                  size={20} 
                  color={message.trim() ? "#fff" : "#9ca3af"} 
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ChatModal;