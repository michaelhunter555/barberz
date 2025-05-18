import { ColorSchemeName, Text, TouchableOpacity } from "react-native";
import useAuth from "@/context/auth/use-auth";
import { StyledGrid, StyledText, StyledBlurGridItem } from "./SettingStyles";
import { StyleText } from "../shared/SharedStyles";
import { Icon } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IBarber } from "@/types";

interface IAccountLocationGrid {
    blurIntensity: number;
    blurType: 'light' | 'dark'
}
const AccountLocationGrid = ({
    blurIntensity,
    blurType,
}: IAccountLocationGrid) => {
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
        <StyledBlurGridItem intensity={blurIntensity} tint={blurType}>
            <TouchableOpacity onPress={updateAccountType}>
            <StyleText><Text style={{ fontWeight: 700 }}>Account: </Text>{auth?.userAuth?.accountType}</StyleText>
            </TouchableOpacity>
        </StyledBlurGridItem>
        <StyledBlurGridItem intensity={blurIntensity} tint={blurType} style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-start' }}>
            <Icon size={20} source="map-marker" />
            <StyleText style={{ fontSize: 12 }}>Baltimore, Md</StyleText>
        </StyledBlurGridItem>
    </StyledGrid>
    )
}

export default AccountLocationGrid;