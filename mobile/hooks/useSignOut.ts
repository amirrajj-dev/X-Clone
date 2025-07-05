// useSignOut.ts
import { useClerk } from "@clerk/clerk-expo";
import { useState } from "react";

export const useSignOut = () => {
  const { signOut } = useClerk();
  const [isVisible, setIsVisible] = useState(false);

  const showSignOut = () => setIsVisible(true);
  const hideSignOut = () => setIsVisible(false);
  
  const handleSignOut = () => {
    signOut();
    hideSignOut();
  };

  return { 
    isSignOutVisible: isVisible, 
    showSignOut, 
    hideSignOut, 
    handleSignOut 
  };
};