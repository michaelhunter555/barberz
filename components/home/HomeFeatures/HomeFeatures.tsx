import React from 'react';
import { Text, View, Image, ColorSchemeName, TouchableOpacity } from 'react-native';
import { Surface, Icon, Divider, Chip, Button,  } from 'react-native-paper';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';
import { backgroundGradients } from '@/theme/gradients';
import { LinearGradient } from 'expo-linear-gradient';

const featureList = [
    { icon: 'tag', text: "$10 off", textLong: 'Take $10 off your first cut.', imgSrc: "offer" },
    { icon: 'star', text: "build", textLong: 'Review and earn rewards', imgSrc: "earn" },
    { icon: 'google-maps', text: 'global', textLong: 'Travel the world', imgSrc: "map" }
]

const imageSources = {
    offer: require("../../../assets/images/offer.png"),
    earn: require("../../../assets/images/earn.png"),
    map: require("../../../assets/images/map.png")
}

interface IHomeFeatures {
    colorScheme: ColorSchemeName;
}

export const HomeFeatures = ({ colorScheme }: IHomeFeatures) => {
    const gradientScheme = backgroundGradients.find((g) => g.key === 'greenBlue') || { colors: ["#000", "#222"] }
    const gradients: readonly [string, string, ...string[]] = [gradientScheme?.colors[0], gradientScheme.colors[1],]
    const blurTint = colorScheme === 'dark' ? 'light' : 'dark';
    const blurIntensity = colorScheme === 'dark' ? 70 : 35;
    const gList = backgroundGradients.slice(2)

    return (
        <StyledScrollView horizontal={true} bounces={true}>
            {featureList.map((feature, i) => (
                <StyledBlurCard intensity={blurIntensity} tint={blurTint} key={feature.icon}>

                    <LinearGradient colors={[gList[i].colors[0], gList[i].colors[1], ...gList[i].colors]} style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 5,
                    }}>
                        <StyledImage
                            source={imageSources[feature.imgSrc as keyof typeof imageSources]} alt={feature.text} />
                    </LinearGradient>

                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <StyledText colorScheme={colorScheme}>{feature.textLong}</StyledText>
                        <Divider style={{ width: '100%', marginVertical: 2 }} />
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <TouchableOpacity style={{ paddingRight: 5}}>
                            <Text style={{ fontSize: 12, color: "#2196F3" }}>Get</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </StyledBlurCard>

            ))}
        </StyledScrollView>
    )
}

const StyledButton = styled(Button)`
font-size: 10px;
`

const StyledText = styled.Text`
font-size: 10px;
color: ${(props: { colorScheme: ColorSchemeName }) => props.colorScheme === 'light' ? '#222' : "#f1f1f1"}
`;
const StyledBlurCard = styled(BlurView)`
    display: flex;
    flex: 1;
    padding: 5px;
    justify-content: center;
    overflow: hidden;
    border-radius: 10px;
    margin-right: 10px;
`;

const StyledImage = styled.Image`
width: 150px;
height: 50px;
overflow: hidden;
`;


const StyledScrollView = styled.ScrollView`
display: flex;
flex-direction: row;
gap: 10px;
marginTop: 10px;
width: 100%;
padding: 0 0 5px 0px;
`;