import { ColorSchemeName, Text, TouchableOpacity } from "react-native";
import useAuth from "@/context/auth/use-auth";
import { StyledGrid, StyledText, StyledBlurGridItem } from "./SettingStyles";
import { StyleText, StyledBlurView } from "../shared/SharedStyles";
import { Icon } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IBarber } from "@/types";

interface IAccountLocationGrid {
    blurIntensity: number;
    blurType: 'light' | 'dark'
}
const AccountLocationGrid = () => {
    const auth = useAuth();

    // temp function PLEASE DELETE before production
    const updateAccountType = () => {
        const user = { 
            ...auth?.userAuth, 
            accountType: auth?.userAuth?.accountType === 'barber' ? "user" : "barber" 
        }
        auth?.updateUser(user as IBarber)
        AsyncStorage.setItem("@user", JSON.stringify(user));
    };

    return (
        <StyledGrid>
        <StyledBlurView 
        borderRadius={10} 
        isPaper 
        justify="center" 
        align="center" 
        style={{ width: '48%', padding: 10}}>
            <TouchableOpacity onPress={updateAccountType}>
            <StyleText><Text style={{ fontWeight: 700 }}>Account: </Text>{auth?.userAuth?.accountType}</StyleText>
            </TouchableOpacity>
        </StyledBlurView>
        <StyledBlurView isPaper direction="row" gap={10} justify="flex-start" style={{ padding: 10, width: "48%" }}>
            <Icon size={20} source="map-marker" />
            <StyleText style={{ fontSize: 12 }}>Baltimore, Md</StyleText>
        </StyledBlurView>
    </StyledGrid>
    )
}

export default AccountLocationGrid;