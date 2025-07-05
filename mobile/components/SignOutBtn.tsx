import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useSignOut } from '@/hooks/useSignOut'
import { SignOutModal } from './modals/SignOutModal'

const SignOutBtn = () => {
  const { isSignOutVisible , showSignOut , hideSignOut, handleSignOut } = useSignOut();
  return (
    <View>
    <TouchableOpacity onPress={()=>showSignOut()}>
      <Feather name='log-out' color={"#e11d48"} size={24} />
    </TouchableOpacity>
     <SignOutModal
            visible={isSignOutVisible}
            onCancel={hideSignOut}
            onConfirm={handleSignOut}
          />
    </View>
  )
}

export default SignOutBtn