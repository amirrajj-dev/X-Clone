import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";
import { useApiClient, userApi } from "@/configs/api";

export const useSyncUser = () => {
  const { isSignedIn } = useAuth();
  const api = useApiClient();
  const {
    mutate: syncUserMutation,
    data
  } = useMutation({
    mutationKey: ["syncUserMutation"],
    mutationFn: async () => {
      const response = await userApi.syncUser(api);;
      return response.data;
    },

    onSuccess: (response) => {
      if (response.success) {
        console.log(response.message || "sync user success");
        console.log("synced user =>  ", response.user);
      }
    },
    onError: (error: any) => {
      console.log("Message:", error.message || "sync user failed");
    },
  });

  useEffect(() => {
    if (isSignedIn && !data) {
      syncUserMutation();
    }
  }, [isSignedIn, data, syncUserMutation]);
  return null;
};