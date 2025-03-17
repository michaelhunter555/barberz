import React, { useState } from 'react';
import { StyledText, StyledView } from "./UIComponents";
import { List, Card, Avatar, IconButton } from "react-native-paper";
import { type TUser } from "../home/DummyData";
import StarRating from 'react-native-star-rating-widget';

interface IUserCard<T extends Partial<TUser>> {
userData: T[];
}

export const UserCard = ({ userData }: IUserCard<TUser> ) => {
    const [rating, setRating] = useState<number>(4.5);
   return (
    <StyledView
    justify="center"
    direction="column"
    align="start"
    flexSpace={1}
    spacing={1}
    >
        {userData.map((user, index) => (
            <Card
                key={`${user.name}-${index}`}
                style={{ backgroundColor: 'white' }}
            >
                <Card.Title
                title={
                    <StyledView direction="column" alignItems="start">
                    <StarRating starSize={15} rating={rating} onChange={setRating} />
                    <StyledText styled={{ fontWeight: 'bold'}}>{user.name}</StyledText>
                    </StyledView>
                }
                subtitle={
                    <StyledView direction="column">
                   <StyledText>${user.price.toFixed(2)} - {user.location}</StyledText>
                    </StyledView>
                }
                left={(props) => <Avatar.Icon style={{ backgroundColor: "#000" }} {...props} icon={user.image} />}
                right={(props) => <IconButton  {...props} icon="dots-vertical" onPress={() => {}} />}
              />
            </Card>
        ))}
    </StyledView>
   )
}