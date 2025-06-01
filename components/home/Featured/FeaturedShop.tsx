import React, { useState } from 'react';
import { TouchableOpacity, Text, View, ColorSchemeName, Image } from 'react-native';
import styled from 'styled-components/native';
import { BlurView } from 'expo-blur';
import { Divider, Chip, Icon } from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import { StarRatings } from '@/components/shared/ratings/ratings';
import { StyledBlurView, StyledView, StyleText } from '../../shared/SharedStyles';

interface IFeaturedShop {
    colorScheme: ColorSchemeName;
    imgSrc?: string;
}

export const FeaturedShop = ({ colorScheme, imgSrc }: IFeaturedShop) => {
    const [rating, setRating] = useState<number>(5);
const shopImg = require("../../../assets/images/homeImg.png")
const textColor = colorScheme === 'light'? '#222':'#f1f1f1';

    return (
        <StyledBlurView isPaper style={{ padding: 10 }}>
            <View style={{ borderRadius: 10, display: 'flex', flexDirection: 'row', gap: 10,}}>
<StyledView>

            <Image source={shopImg} style={{ width: 100, height: 100, borderRadius: 10 }} />
</StyledView>
            <Divider style={{ width: 1, height: 90 }}/>
            <View style={{ display: 'flex',flexDirection: 'column', alignItems: 'flex-start', flex: 1}}>
                <StyledView direction="row" align="center">
                    
                   {/* <StarRating starSize={15} rating={rating} onChange={setRating} /> */}
                   <StarRatings size={15} userRating={rating} isReview={false} color="yellow" />
                    <StyledText style={{color: textColor, fontSize: 10 }}>- </StyledText>
                    <StyledText style={{color: textColor, fontSize: 10 }}>5.0 (15 reviews)</StyledText>
                </StyledView>
                <StyledText style={{ fontWeight: 700, fontSize: 15 }} color={textColor}>3 Brothers Barber Shop</StyledText>
            <StyledText color={textColor}>Get the type of cut that make you feel like a million bucks today!</StyledText>

            <StyledView 
            direction="row"
            justify="flex-start"
            align="center"
            gap={5}
            style={{ 
                backgroundColor: "#049f00",
                borderRadius: 10, 
                padding: 2,
                }}>
                    <Icon source="content-cut" color='#fff' size={10}/>
                     
                    <StyledText style={{
                        fontWeight: 600, 
                        fontSize: 10 }} color="#fff">Cuts starting at $20.00!</StyledText>
            </StyledView>
            </View>
            </View>
            <Divider style={{ width: "100%", marginVertical: 5 }} />
            <StyledView direction="row"  justify="flex-end" gap={5} style={{ paddingRight: 2 }}>
            <TouchableOpacity activeOpacity={0.7} style={{ borderRadius: 50, padding: 2}}>
                <StyledText style={{ flexWrap: 'wrap' }} color="#007AFF">View shop</StyledText>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={{ backgroundColor: "#007AFF",  borderRadius: 50, padding: 4}}>
                <StyledText color={"#e6f7ff"}>Check Availability</StyledText>
            </TouchableOpacity>
            </StyledView>
        </StyledBlurView>
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