import { Image, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";
import { useAuth } from "@/hooks/useAuth";

export default function Index() {
  const {handleAuth , isLoading} = useAuth()
  return (
   <LinearGradient
      colors={["#ffffff", "#f0f4ff"]}
      className="flex-1 items-center justify-center p-6"
    >
      <Animatable.Image
        source={require('../../assets/images/auth.png')}
        className="w-full h-3/5 mb-10"
        animation="fadeInDown"
        style={{resizeMode : "contain"}}
        duration={1000}
      />
      <View className="w-full">
        {/* GOOGLE BTN  */}
        <Animatable.View animation="fadeInUp" duration={1000} delay={200}>
          <TouchableOpacity
          disabled={isLoading}
          onPress={()=>handleAuth("oauth_google")}
            className="flex-row items-center justify-center py-4 px-6 bg-white rounded-xl shadow-lg mb-4 border border-gray-100"
            activeOpacity={0.7}
          >
            {isLoading ? (
              <ActivityIndicator size={"small"} color={"#3b82f6"}/>
            ) : (
              <View className="flex-row">
            <Image
              source={require("../../assets/images/google.png")}
              className="size-7 mr-4"
              // style={{resizeMode : "contain"}}
            />
            <Text className="font-semibold text-lg text-gray-800">
              Continue with Google
            </Text>
              </View>
            )}
          </TouchableOpacity>
        </Animatable.View>
        {/* APPLE BTN  */}
        <Animatable.View animation="fadeInUp" duration={1000} delay={400}>
          <TouchableOpacity
          onPress={()=>handleAuth("oauth_apple")}
          disabled={isLoading}
            className="flex-row items-center justify-center py-4 px-6 bg-white rounded-xl shadow-lg border border-gray-100"
            activeOpacity={0.7}
          >
            {isLoading ? (
              <ActivityIndicator size={"small"} color={"#3b82f6"}/>
            ) : (
              <View className="flex-row">
            <Image
              source={require("../../assets/images/apple.png")}
              className="size-8 mr-4"
              style={{resizeMode : "contain"}}
            />
            <Text className="font-semibold text-lg text-gray-800">
              Continue with Apple
            </Text>
              </View>
            )}
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.Text
          animation="fadeIn"
          duration={1000}
          delay={600}
          className="text-center text-sm text-gray-500 mt-8 px-4"
        >
          By signing up, you agree to our{" "}
          <Text className="text-blue-500 font-medium">Terms</Text>,{" "}
          <Text className="text-blue-500 font-medium">Privacy Policy</Text>, and{" "}
          <Text className="text-blue-500 font-medium">Cookie Use</Text>.
        </Animatable.Text>
      </View>
    </LinearGradient>
  );
}