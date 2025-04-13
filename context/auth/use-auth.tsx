import { useEffect } from 'react';
import { IBarber } from "@/types";
import React, { createContext, useState, useContext } from "react";
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage'

export type TAuthContext = {
   userAuth: Partial<IBarber> & { picture?: string } | null,
   signIn: () => void;
   signOut: () => void;
   updateUser: (user: Partial<IBarber>) => void;
   googleResponse: any | null
}  | null

export const AuthContext = createContext<TAuthContext>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
  const [userAuth, setAuthUser] = useState<Partial<IBarber> & { picture: string } | null>(null);
   const [request, response, promptAsync] = Google.useAuthRequest({
      androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID,
      iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS
    });

  useEffect(() => {
    handleGoogleSignIn()
    console.log("I ran again")
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
      setAuthUser((prev) => (prev ? { ...prev, ...updateUser } : null))
    }

    const checkDbUser = async (name: string, imagePath: string, email: string) => {
      try {
          const response = await fetch(`${process.env.EXPO_PUBLIC_API_SERVER}/user/get-user-account`,
              {
                  method: 'POST',
                  body: JSON.stringify({ email, name, imagePath }),
                  headers: { "Content-Type": "application/json" }
              })
          const data = await response.json();
          if (!data.ok) {
              throw new Error(data.error);
          }
          setAuthUser(data.user)
          AsyncStorage.setItem("@user", JSON.stringify(data.user));
          return data.user;
      } catch (err) {
          console.log("There was an error trying to retreive user data." + err)
      }
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
