import React, { useState } from 'react';
import { View, ColorSchemeName, TouchableOpacity } from 'react-native';
import { StyledText, StyledView, StyledScrollView, StyledBlurContainer } from "./UserListStyles";
import { Card, Avatar, IconButton } from "react-native-paper";
import { type TUser } from "../../home/DummyData";
import StarRating from 'react-native-star-rating-widget';
import { StarRatings } from '../ratings/ratings';
import { glassGradients } from '@/theme/gradients';
import { Link } from 'expo-router';

interface IUserCard<T extends Partial<TUser>> {
    userData: T[];
    colorScheme: ColorSchemeName;
}

const UserCard = ({ userData, colorScheme }: IUserCard<TUser>) => {
    const textColor = colorScheme === 'light' ? '#222' : '#f1f1f1'
    const [rating, setRating] = useState<number>(4.5);
    const blurType = colorScheme === 'dark' ? 'light' : 'dark';
    const intensity = colorScheme === 'dark' ? 55 : 35;

    return (
        <StyledScrollView>
            <StyledView
                justify="center"
                direction="column"
                align="start"
                flexSpace={1}
                spacing="5px"
            >
                {userData.map((user, index) => (
                    <Link href={{
                        pathname: "/barbers/[id]",
                        params: {
                            id: user.id,
                            name: user.name,
                            location: user.location,
                            price: user.price.toString(), 
                            image: user.image
                        }
                    }} asChild key={`${user.name}-${index}`}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => console.log(user)} key={`${user.name}-${index}`}>
                            <StyledBlurContainer intensity={intensity} tint={blurType}>
                                <Card
                                    style={{ backgroundColor: 'transparent' }}
                                >
                                    <Card.Title
                                        titleNumberOfLines={0}
                                        titleStyle={{ padding: 0 }}
                                        title={
                                            <StyledView direction="column" align="flex-start" style={{ paddingLeft: 10, paddingVertical: 2 }}>
                                                {/* <StyledText style={{ fontSize: 8 }}>"best deals & best service"</StyledText> */}
                                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                                                    {/* <StarRating starSize={15} rating={rating} onChange={setRating} /> */}
                                                    <StarRatings userRating={4} isReview={false} size={12} color="white" />
                                                    <StyledText style={{ color: textColor, fontSize: 10 }}>- </StyledText>
                                                    <StyledText style={{ color: textColor, fontSize: 10 }}>4.5 (15 reviews)</StyledText>
                                                </View>
                                                <StyledText style={{ color: colorScheme === 'light' ? '#013700' : '#9deb9b' }}>Availableve Now</StyledText>
                                                <StyledText style={{ color: textColor, }}>{user.name}</StyledText>
                                                <StyledText style={{ color: textColor, fontSize: 11 }}>${user.price.toFixed(2)} - {user.location}</StyledText>
                                            </StyledView>
                                        }
                                        left={(props) => <Avatar.Image style={{ backgroundColor: "#000" }} size={55} source={{ uri: user.image}} />}
                                        right={(props) => <IconButton  {...props} icon="dots-vertical" onPress={() => { }} />}
                                    />
                                </Card>
                            </StyledBlurContainer>
                        </TouchableOpacity>
                    </Link>
                ))}
            </StyledView>
        </StyledScrollView>
    )
}

export default UserCard;