import { AuthContext } from '@/context/auth/use-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';

export const useUser = () => {
    const auth = useContext(AuthContext);

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
            auth?.updateUser(data.user);
            AsyncStorage.setItem("@user", data.user);
            return data.user;
        } catch (err) {
            console.log("There was an error trying to retreive user data." + err)
        }
    }

    return { checkDbUser }
}