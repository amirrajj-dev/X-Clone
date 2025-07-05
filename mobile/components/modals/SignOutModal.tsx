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
    <View className="flex-1 bg-black/50 justify-center items-center">
      <View className="w-4/5 bg-white rounded-xl p-5 shadow-lg shadow-black/25">
        <Text className="text-xl font-bold mb-2 text-center">Log Out</Text>
        <Text className="text-base text-gray-600 mb-5 text-center">
          Are you sure you want to sign out?
        </Text>

        <View className="flex-row justify-between">
          <TouchableOpacity
            className="flex-1 py-3 rounded-lg bg-gray-100 mx-1 items-center"
            onPress={onCancel}
          >
            <Text className="text-gray-800 font-semibold">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 py-3 rounded-lg bg-rose-500 mx-1 items-center"
            onPress={onConfirm}
          >
            <Text className="text-white font-semibold">Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);
