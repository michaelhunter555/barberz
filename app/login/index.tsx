import { useEffect } from 'react';
import { useColorScheme } from "react-native";
import { router } from "expo-router";
import Login from "@/components/Login/Login";
import useAuth from "@/context/auth/use-auth";

const LoginPage = () => {
    const auth = useAuth();
    const colorScheme = useColorScheme();

    useEffect(() => {
        if(auth?.userAuth !== null) {
            router.push({ pathname: "/"});
        }
    }, [auth?.userAuth]);
    console.log("LoginAuth ", auth?.userAuth)
    
    const handleLogin = () => auth?.signIn();

    return <Login authLogin={handleLogin} colorScheme={colorScheme} />
}

export default LoginPage;