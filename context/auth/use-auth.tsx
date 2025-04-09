import { useEffect } from 'react';
import { IBarber } from "@/types";
import React, { createContext, useState, useContext } from "react";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUser } from '@/hooks/user-hooks';

export type TAuthContext = {
   userAuth: Partial<IBarber> & { picture?: string } | null,
   signIn: () => void;
   signOut: () => void;
   updateUser: (user: Partial<IBarber>) => void;
   googleResponse: any | null
}  | null

export const AuthContext = createContext<TAuthContext>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
  const { checkDbUser } = useUser();
  const [userAuth, setAuthUser] = useState<Partial<IBarber> & { picture: string } | null>(null);
   const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID,
      iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS
    });

  useEffect(() => {
    handleGoogleSignIn()
  }, [response])

  const handleGoogleSignIn = async () => {
      const user = await AsyncStorage.getItem("@user");
      if(!user) {
        if(response?.type === "success") {
          await getUserInfo(response.authentication?.accessToken)
        }
      } else {
        const parsedUser = JSON.parse(user);
        setAuthUser(parsedUser)
        //check if user exists here and if not, create them
        console.log(JSON.parse(user))
        await checkDbUser(
          String(parsedUser?.name), 
          String(parsedUser?.picture), 
          String(parsedUser?.email))
      }
    }
    
    const getUserInfo = async (token: any) => {
      if(!token) return;
      try {
        const response = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${token}`}
          }
        )
        const user = await response.json();
        await AsyncStorage.setItem("@user", JSON.stringify(user))
      } catch(err) {
        console.log("Error loggin in: " + err)
      }
    }

    const updateUser = async (updateUser: Partial<IBarber>) => {
      setAuthUser((prev) => (prev ? { ...prev, ...updateUser }: null))
    }

  return (
    <AuthContext.Provider value={{ 
      googleResponse: response, 
      userAuth,
      updateUser: updateUser, 
      signIn: () => promptAsync(), 
      signOut: () => AsyncStorage.removeItem("@user") }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth Context
export const useAuth = () => useContext(AuthContext);
