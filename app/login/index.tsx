import { useColorScheme } from "react-native";
import Login from "@/components/Login/Login";
import { useAuth } from "@/context/auth/use-auth";

const LoginPage = () => {
    const auth = useAuth();
    const colorScheme = useColorScheme();
    return <Login authLogin={() => auth?.signIn()} colorScheme={colorScheme} />
}

export default LoginPage;