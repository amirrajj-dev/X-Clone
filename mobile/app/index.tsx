import { Text, TextInput, View } from "react-native";

export default function Index() {
  return (
     <View className="flex-1 bg-emerald-600 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-emerald-50">
        Welcome to Nativewind!
      </Text>
      <TextInput placeholder="Enter Your Name" className="bg-emerald-300 p-2 rounded-md shadow-sm w-1/2 border border-emerald-50 placeholder:text-emerald-50 focus:bg-emerald-800" />
    </View>
  );
}
