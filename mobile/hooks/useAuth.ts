import { useSSO } from "@clerk/clerk-expo"
import { useState } from "react"
import { Alert } from "react-native"

export const useAuth = ()=>{
    const [isLoading , setIsLoading] = useState(false)
    const {startSSOFlow} = useSSO()
    const handleAuth = async (strategy : "oauth_google" | "oauth_apple")=>{
        try {
            setIsLoading(true)
            const {createdSessionId , setActive} = await startSSOFlow({
                strategy
            })
            if (createdSessionId && setActive){
                await setActive({session : createdSessionId})
            }
        } catch (error) {
            console.log("error in social auth => " , error)
            const provider = strategy === "oauth_google" ? "Google" : "Apple";
            Alert.alert(`
                Failed to authenticate with ${provider} Please Try Again.`)
        }finally{
            setIsLoading(false)
        }
    }
    return {isLoading , handleAuth}
}