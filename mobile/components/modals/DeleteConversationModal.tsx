import { Ionicons } from '@expo/vector-icons';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface DeleteModalProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  userName?: string;
}

const DeleteConversationModal = ({
  visible,
  onDismiss,
  onConfirm,
  userName = '',
}: DeleteModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <View className="flex-1 bg-black/50 dark:bg-black/70 justify-center items-center p-5">
        <View className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-lg shadow-black/25 w-full max-w-md">
          {/* Warning Icon & Title */}
          <View className="flex-row items-center mb-4 gap-2">
            <View className="bg-amber-100 dark:bg-amber-900/30 p-1.5 rounded-full">
              <Ionicons name='warning' size={24} color="#eab308"/>
            </View>
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              Warning
            </Text>
          </View>
          
          {/* Message */}
          <Text className="text-gray-700 dark:text-gray-300 mb-6 text-base leading-6">
            Are you sure about deleting <Text className="font-semibold dark:text-white">{userName || 'this user'}</Text>? 
            This action cannot be undone.
          </Text>
          
          {/* Buttons */}
          <View className="flex-row justify-between gap-3">
            <TouchableOpacity
              onPress={onDismiss}
              className="flex-1 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600"
              activeOpacity={0.8}
            >
              <Text className="text-gray-800 dark:text-gray-200 font-medium text-center">
                Cancel
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={onConfirm}
              className="flex-1 py-3 rounded-lg bg-rose-500 active:bg-rose-600"
              activeOpacity={0.8}
            >
              <Text className="text-white font-medium text-center">
                Delete {userName && userName.split(' ')[0]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteConversationModal;