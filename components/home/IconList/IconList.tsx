import { View, Text } from 'react-native';
import { IconButton, Icon } from "react-native-paper";
import { iconList } from './IconData';
import styled from 'styled-components/native';

export const IconOptionsList = () => {

    return (
        <StyledContainer>
                {iconList.map(({icon, title, color}, i) => (
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={String(icon) + `${i}`}>
                    <IconButton style={{ borderWidth: 1, borderColor: '#999', backgroundColor:'white'}} mode="contained" onPress={() => console.log(`${title} clicked`)} size={25} icon={() => (
                        <Icon source={icon} size={20} color={color} />
                    )} />
                    <Text style={{ fontSize: 10 }}>{title}</Text>
            </View>
                ))}
        </StyledContainer>
    )
}

const StyledContainer = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
gap: 10px;
`