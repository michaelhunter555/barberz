import React, { useState } from 'react';
import { TouchableOpacity, Text, View, ColorSchemeName, Image } from 'react-native';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';
import { Divider, Chip, Icon } from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';

interface IFeaturedShop {
    colorScheme: ColorSchemeName;
    imgSrc?: string;
}

export const FeaturedShop = ({ colorScheme, imgSrc }: IFeaturedShop) => {
    const [rating, setRating] = useState<number>(5);
const shopImg = require("../../../assets/images/homeImg.png")
const textColor = colorScheme === 'light'? '#222':'#f1f1f1';
    const blurType = colorScheme === 'dark' ? 'light': 'dark';
    const intensity = colorScheme === 'dark' ? 55 : 35;

    return (
        <StyledBlurCard tint={blurType} intensity={intensity}>
            <View style={{ borderRadius: 10, display: 'flex', flexDirection: 'row', gap: 10,}}>
<View>

            <Image source={shopImg} style={{ width: 100, height: 100, borderRadius: 10 }} />
</View>
            <Divider style={{ width: 1, height: 90 }}/>
            <View style={{ display: 'flex',flexDirection: 'column', alignItems: 'flex-start', flex: 1}}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                   <StarRating starSize={15} rating={rating} onChange={setRating} />
                    <StyledText style={{color: textColor, fontSize: 10 }}>- </StyledText>
                    <StyledText style={{color: textColor, fontSize: 10 }}>5.0 (15 reviews)</StyledText>
                </View>
                <StyledText style={{ fontWeight: 700, fontSize: 15 }} color={textColor}>3 Brothers Barber Shop</StyledText>
            <StyledText color={textColor}>Get the type of cut that make you feel like a million bucks today!</StyledText>

            <View style={{ 
                display: 'flex', 
                flexDirection: 'row',
                justifyContent: 'flex-start', 
                alignItems: 'center',
                backgroundColor: "#049f00",
                borderRadius: 10, 
                padding: 2,
                gap: 5
                }}>
                    <Icon source="content-cut" color='#fff' size={10}/>
                     
                    <StyledText style={{
                        fontWeight: 600, 
                        fontSize: 10 }} color="#fff">Cuts starting at $20.00!</StyledText>
            </View>
            </View>
            </View>
            <Divider style={{ width: "100%", marginVertical: 5 }} />
            <View style={{ display: 'flex', gap: 5, flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 2}}>
            <TouchableOpacity activeOpacity={0.7} style={{ borderRadius: 50, padding: 2}}>
                <StyledText style={{ flexWrap: 'wrap' }} color="#007AFF">View shop</StyledText>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: "#007AFF",  borderRadius: 50, padding: 4}}>
                <StyledText color={"#e6f7ff"}>Check Availability</StyledText>
            </TouchableOpacity>
            </View>
        </StyledBlurCard>
    )
}

const StyledImage = styled.Image`

`

const StyledBlurCard = styled(BlurView)`
overflow: hidden;
border-radius: 10px;
text-wrap: wrap;
padding: 10px;
`;

const StyledText = styled.Text`
color: ${(props: { color: string }) => props.color }
`;