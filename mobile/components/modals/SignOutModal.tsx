import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";

export const SignOutModal: React.FC<{
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}> = ({ visible, onCancel, onConfirm }) => (
  <Modal
    transparent
    visible={visible}
    animationType="fade"
    onRequestClose={onCancel}
  >
    <View className="flex-1 bg-black/50 dark:bg-black/70 justify-center items-center">
      <View className="w-4/5 bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg shadow-black/25 dark:shadow-gray-950/50">
        <Text className="text-xl font-bold mb-2 text-center text-gray-900 dark:text-white">
          Log Out
        </Text>
        <Text className="text-base text-gray-600 dark:text-gray-300 mb-5 text-center">
          Are you sure you want to sign out?
        </Text>

        <View className="flex-row justify-between gap-3">
          <TouchableOpacity
            className="flex-1 py-3 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600"
            onPress={onCancel}
            activeOpacity={0.8}
          >
            <Text className="text-gray-800 dark:text-gray-200 font-semibold">
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 items-center justify-center py-3 rounded-lg bg-rose-500 active:bg-rose-600"
            onPress={onConfirm}
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold">Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);