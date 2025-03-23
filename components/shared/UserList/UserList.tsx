import React, { useState } from 'react';
import { StyledText, StyledView, StyledScrollView } from "./UserListStyles";
import { List, Card, Avatar, IconButton } from "react-native-paper";
import { type TUser } from "../../home/DummyData";
import StarRating from 'react-native-star-rating-widget';

interface IUserCard<T extends Partial<TUser>> {
userData: T[];
}

export const UserCard = ({ userData }: IUserCard<TUser> ) => {
    const [rating, setRating] = useState<number>(4.5);
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
            <Card
                key={`${user.name}-${index}`}
                style={{ backgroundColor: 'white' }}
            >
                <Card.Title
                titleNumberOfLines={0}
                titleStyle={{ padding: 0}}
                title={
                    <StyledView direction="column" align="flex-start" style={{ paddingLeft: 5, paddingVertical: 5}}>
                    {/* <StyledText style={{ fontSize: 8 }}>"best deals & best service"</StyledText> */}
                <StarRating starSize={15} rating={rating} onChange={setRating} />
                <StyledText style={{ color: 'green' }}>Availableve Now</StyledText>
                <StyledText styled={{ fontWeight: 'bold'}}>{user.name}</StyledText>
                
           <StyledText>${user.price.toFixed(2)} - {user.location}</StyledText>
            </StyledView>
            }
                left={(props) => <Avatar.Icon style={{ backgroundColor: "#000" }} size={50} icon={user.image} />}
                right={(props) => <IconButton  {...props} icon="dots-vertical" onPress={() => {}} />}
              />
            </Card>
        ))}
    </StyledView>
    </StyledScrollView>
   )
}