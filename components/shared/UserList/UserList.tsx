import React, { useState } from 'react';
import { View, ColorSchemeName, TouchableOpacity } from 'react-native';
import { StyledText, StyledView, StyledScrollView, StyledBlurContainer } from "./UserListStyles";
import { Card, Avatar, IconButton, Icon, Button } from "react-native-paper";
import StarRating from 'react-native-star-rating-widget';
import { StarRatings } from '../ratings/ratings';
import { glassGradients } from '@/theme/gradients';
import { Link, router } from 'expo-router';
import { StyledBlurView, StyleText } from '../SharedStyles'
import { IBarber } from '@/types';
import CouponSticker from '../CouponSticker/CouponSticker';

export type TUser = {
    id: number;
    title: string;
    image: string;
    rating: number;
    name: string;
    location: string;
    price: number;
}
interface IUserCard<T extends Partial<IBarber>> {
    userData: T[];
    colorScheme: ColorSchemeName;
}

const UserCard = ({ userData, colorScheme }: IUserCard<IBarber>) => {
    const isDarkMode = colorScheme === 'dark';
    return (
        <StyledScrollView>
            <StyledView
                justify="center"
                direction="column"
                align="start"
                flexSpace={1}
                spacing="5px"
                style={{ marginBottom: 10 }}
            >
                {userData.map((user, index) => (
                            <StyledBlurView key={`${user.name}-${index}`} clickable onClick={() => router.push({
                                pathname: "/barbers/[id]",
                                params: {
                                    id: String(user._id),
                                    name: user.name,
                                    location: user.location,
                                    price: user.startingPrice.toString(), 
                                    image: user.image
                                }
                             })} isPaper justify="center" borderRadius={20} style={{ flex: 1, padding: 5, }}>
                                    <Card.Title
                                        titleNumberOfLines={0}
                                        titleStyle={{ padding: 0 }}
                                        title={
                                            <StyledView direction="column" align="flex-start" style={{ paddingLeft: 10, paddingVertical: 2 }}>
                                                {/* <StyledText style={{ fontSize: 8 }}>"best deals & best service"</StyledText> */}
                                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                                                    {/* <StarRating starSize={15} rating={rating} onChange={setRating} /> */}
                                                    <StarRatings userRating={user?.avgReviewScore} isReview={false} size={12} color="white" />
                                                    <StyleText>- </StyleText>
                                                    <StyleText>{user?.avgReviewScore}</StyleText>
                                                    <StyleText style={{ color: isDarkMode ? '#999': '#555' }}>({user?.totalReviews} reviews)</StyleText>
                                                </View>
                                                <View style={{ display: 'flex', alignItems: 'center', gap: 5, flexDirection: 'row', marginBottom: 3 }}>
                                                <StyleText style={{ color: isDarkMode ? '#999': '#555' }}>Available Now</StyleText>
                                                    <Icon source="circle" size={10} color="green" />
                                                </View>
                                                <View style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                                                <StyleText style={{ fontSize: 14, fontWeight: 600 }}>{user.name}</StyleText>
                                                {user?.coupons.length > 0 && <CouponSticker price={user?.coupons[0].amount} />}
                                                </View>
                                                
                                                <StyleText style={{ fontSize: 11 }}>${user.startingPrice.toFixed(2)} - {user?.userLicense?.city}, {user?.userLicense?.state}</StyleText>
                                            </StyledView>
                                        }
                                        left={(props) => <Avatar.Image style={{}} size={55} source={{ uri: user.image}} />}
                                        right={(props) => <IconButton  {...props} icon="dots-vertical" onPress={() => { }} />}
                                    />
                            </StyledBlurView>
                ))}
            </StyledView>
        </StyledScrollView>
    )
}

export default UserCard;