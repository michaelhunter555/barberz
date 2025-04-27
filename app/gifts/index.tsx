import { useColorScheme } from "react-native";
import { StyledText, StyledView, StyledBlurItem } from "@/components/shared/SharedStyles";

const SendGifts = () => {
    const colorScheme = useColorScheme();
    return (
        <StyledView>
            <StyledText colorScheme={colorScheme}>Hello</StyledText>
        </StyledView>
    )
}

export default SendGifts;