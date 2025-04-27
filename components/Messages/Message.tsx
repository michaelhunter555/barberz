import { ScrollView, ColorSchemeName, TouchableOpacity } from 'react-native';
import { 
    StyledView, 
    StyledText, 
    getBlurType, 
    getIntensity, 
    StyledBlurItem } from "@/components/shared/SharedStyles";
import { Avatar, Divider } from 'react-native-paper';

interface IMessages {
   message: {
    id: string | number;
    userName: string;
    date: string;
    messageText: string;
    imagePath: string;
   }
    onClick: () => void;
    colorScheme: ColorSchemeName;
}

const Message = ({
    message,
    onClick,
    colorScheme,
}: IMessages) => {
    const blurIntensity = getIntensity(colorScheme);
    const blurType = getBlurType(colorScheme);

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onClick}>

        <StyledView direction="row" gap={5} align="center">
            <StyledView>
                <Avatar.Image source={{ uri: message.imagePath }} />
            </StyledView>

<StyledView>

            <StyledView direction="row" align="center" gap={10}>
                <StyledText style={{ fontSize: 15, fontWeight: 700}} colorScheme={colorScheme}>{message.userName}</StyledText>
                <StyledText colorScheme={colorScheme}>&bull;</StyledText>
                <StyledText colorScheme={colorScheme}>{message.date}</StyledText>
            </StyledView>

            <StyledView>
                <StyledText style={{ fontSize: 13 }} colorScheme={colorScheme}>{message.messageText}</StyledText>
            </StyledView>
</StyledView>

            
        </StyledView>
        </TouchableOpacity>
    )
}

export default Message;