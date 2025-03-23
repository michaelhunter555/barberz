import { View, Text } from 'react-native';
import { ColorSchemeName, ScrollView, TouchableOpacity } from 'react-native';
import { IconButton, Icon } from "react-native-paper";
import { iconList } from './IconData';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';

interface IconOptionsListProps {
    colorScheme: ColorSchemeName ;
}

export const IconOptionsList = ({ colorScheme }: IconOptionsListProps) => {
    const textColor = colorScheme === 'light' ? "#222":"#999";
    const blurType = colorScheme === 'light' ? "dark": "light"
    const iconColor = colorScheme === 'light' ? "#444":"#f1f1f1"
    const blurIntensity = colorScheme === 'light' ? 35:50;
    return (
            <StyledScrollView horizontal={true} bounces={true}>
        <StyledContainer>
                {iconList.map(({icon, title, color}, i) => (
                    <TouchableOpacity key={i} onPress={() => console.log(`${title} clicked`)}>

                    <StyledBlurContainer intensity={blurIntensity} tint={blurType} key={String(icon) + `${i}`}>
                        
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                        <Icon source={icon} size={25} color={iconColor} />
                    
                    <Text style={{ fontSize: 10, color: textColor }}>{title}</Text>
            </View>
                    </StyledBlurContainer>
                    </TouchableOpacity>
                ))}
        </StyledContainer>
            </StyledScrollView>
    )
}
export const StyledBlurContainer = styled(BlurView)`
    padding: 2px;
    text-align: center;
    justify-content: center;
    overflow: hidden;
    min-width: 70px;
    border-radius: 10px;
`;

const StyledContainer = styled.View`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
gap: 5px;
`

const StyledScrollView = styled.ScrollView`
display: flex;
flex-direction: row;

`;