import React from 'react';
import { Text, View, ScrollView} from 'react-native';
import { Surface, Icon } from 'react-native-paper';
import styled from 'styled-components/native';

const featureList = [
    {icon: 'tag', text: "$10 off", textLong: 'Take $10 off your first cut.'},
    {icon: 'star', text: "build", textLong: 'Review and earn rewards'},
    {icon: 'google-maps', text: 'global', textLong: 'Travel the world'}
]

export const HomeFeatures = () => {
    return (
    <StyledScrollView horizontal={true}>
        {featureList.map((feature, i) =>  (
                <StyledSurface elevation={4} key={i}>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <Icon source={feature.icon} size={30} />
                    <Text>{feature.text}</Text>
                </View>
                
                <View>
                    <Text style={{ fontSize: 10 }}>{feature.textLong}</Text>
                </View>
                </StyledSurface>
        ))}
    </StyledScrollView>
    )
}

const StyledSurface= styled(Surface)`
background-color: white;
display: flex;
flex-direction: column;
minWidth: 150px;
margin-right: 10px;
border-radius: 10px;
padding: 5px;
`

const StyledScrollView = styled.ScrollView`
display: flex;
flex-direction: row;
gap: 10px;
marginTop: 10px;
width: 100%;
padding: 5px;
`