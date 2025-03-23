import React from 'react';
import { Text, View, Image} from 'react-native';
import { Surface, Icon } from 'react-native-paper';
import styled from 'styled-components/native';

const featureList = [
    {icon: 'tag', text: "$10 off", textLong: 'Take $10 off your first cut.', imgSrc: "offer"},
    {icon: 'star', text: "build", textLong: 'Review and earn rewards', imgSrc: "earn"},
    {icon: 'google-maps', text: 'global', textLong: 'Travel the world', imgSrc: "map"}
]

const imageSources = {
    offer: require("../../assets/images/offer.png"),
    earn: require("../../assets/images/earn.png"),
    map: require("../../assets/images/map.png")
}

export const HomeFeatures = () => {
    return (
    <StyledScrollView horizontal={true} bounces={true}>
        {featureList.map((feature, i) =>  (
                <StyledSurface elevation={4} key={i}>
                <View style={{ 
                    backgroundColor: '#222', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                   borderRadius: 5,
                    }}>
                    <StyledImage
                    source={imageSources[feature.imgSrc as keyof typeof imageSources]} alt={feature.text}/>
                </View>
                
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 10 }}>{feature.textLong}</Text>
                </View>
                </StyledSurface>
        ))}
    </StyledScrollView>
    )
}

const StyledImage = styled.Image`
width: 150px;
height: 40px;
overflow: hidden;
`;

const StyledSurface= styled(Surface)`
background-color: white;
display: flex;
flex-direction: column;
minWidth: 170px;
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
padding: 0 0 5px 0px;
`;