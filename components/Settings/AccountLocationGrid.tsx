import { ColorSchemeName, Text } from "react-native";
import { StyledGrid, StyledText, StyledBlurGridItem } from "./SettingStyles";
import { Icon } from "react-native-paper";

interface IAccountLocationGrid {
    colorScheme: ColorSchemeName;
    blurIntensity: number;
    blurType: 'light' | 'dark'
}
const AccountLocationGrid = ({
    colorScheme,
    blurIntensity,
    blurType,
}: IAccountLocationGrid) => {
    return (
        <StyledGrid>
        <StyledBlurGridItem intensity={blurIntensity} tint={blurType}>
            <StyledText colorScheme={colorScheme}><Text style={{ fontWeight: 700 }}>Account:</Text>User</StyledText>
        </StyledBlurGridItem>
        <StyledBlurGridItem intensity={blurIntensity} tint={blurType} style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-start' }}>
            <Icon size={20} source="map-marker" />
            <StyledText colorScheme={colorScheme} style={{ fontSize: 12 }}>Baltimore, Md</StyledText>
        </StyledBlurGridItem>
    </StyledGrid>
    )
}

export default AccountLocationGrid;