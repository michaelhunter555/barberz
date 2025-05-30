import { TouchableOpacity } from "react-native";
import { StyledView, StyleText } from "../shared/SharedStyles";
import { Avatar } from "react-native-paper";
import { StarRatings } from "../shared/ratings/ratings";
import { router } from "expo-router";

interface IUserReview {
    reviewText: string;
    reviewRating: number;
    reviewDate: string;
    userName: string;
    userImage: string;
    shouldLink?: boolean;
}

const UserReview = ({
    reviewText, 
    reviewRating, 
    reviewDate, 
    userName, 
    userImage,
    shouldLink,
}: IUserReview) => {
    return (
        <StyledView direction="row" align="center" gap={10}>
            <StyledView>
                <Avatar.Image source={{ uri: userImage }} />
            </StyledView>
            <StyledView direction="column" gap={3}>
                <StarRatings
                isReview={false}
                size={15}
                color="white" 
                userRating={reviewRating} />
                <StyledView direction="row" align="center" gap={3}>
                    <StyleText style={{ fontWeight: 700,}}>{userName}-</StyleText>
                    <StyleText>{reviewDate}</StyleText>
                </StyledView>
                    <StyleText>3 more photos</StyleText>
                <StyledView style={{ textWrap: 'wrap', width: '90%' }}>
                    <StyleText style={{ flex: 1 }}>
                        {reviewText}
                    </StyleText>
                </StyledView>
            </StyledView>
           {shouldLink &&  <StyledView direction="row" align="flex-end" justify="flex-end">
                <TouchableOpacity activeOpacity={0.8} onPress={() => router.push({ pathname: '/barbers/[id]/reviews', params: { id: 'TEST-BARBER-Reviews'}})}>
                    <StyleText style={{ color: '#007AFF' }}>All Reviews</StyleText>
                </TouchableOpacity>
            </StyledView>}
        </StyledView>
    )
}

export default UserReview;