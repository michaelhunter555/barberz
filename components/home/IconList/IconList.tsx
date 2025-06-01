import { View, Text } from 'react-native';
import { ColorSchemeName, ScrollView, TouchableOpacity } from 'react-native';
import { IconButton, Icon } from "react-native-paper";
import { iconList } from './IconData';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';
import { Link } from 'expo-router';
import { StyledBlurView, StyledView, StyleText } from '../../shared/SharedStyles';

interface IconOptionsListProps {
    colorScheme: ColorSchemeName;
}

export const IconOptionsList = ({ colorScheme }: IconOptionsListProps) => {
    const textColor = colorScheme === 'light' ? "#222" : "#999";
    const blurType = colorScheme === 'light' ? "dark" : "light"
    const iconColor = colorScheme === 'light' ? "#444" : "#f1f1f1"
    const blurIntensity = colorScheme === 'light' ? 35 : 50;
    return (
        <StyledScrollView
        showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false} 
        horizontal={true} 
        bounces={true}>
            <StyledContainer>
                {iconList.map(({ icon, title, color, link }, i) => (
                    <TouchableOpacity activeOpacity={0.7} key={i} onPress={() => console.log(`${title} clicked`)}>
                        
                        <StyledBlurView
                        isPaper 
                        key={String(icon) + `${i}`}
                        borderRadius={10}
                        justify='center' 
                        style={{ minWidth: 70, padding: 2 }}>

                            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                                <Icon source={icon} size={25} color={iconColor} />

                                <Text style={{ fontSize: 10, color: textColor }}>{title}</Text>
                            </View>
                        </StyledBlurView>
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
gap: 10px;
`

const StyledScrollView = styled.ScrollView`
display: flex;
flex-direction: row;

`;