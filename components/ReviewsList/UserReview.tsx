import { TouchableOpacity, useColorScheme } from "react-native";
import { StyledView, StyledText, StyledBlurItem } from "../shared/SharedStyles";
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
    const colorScheme = useColorScheme();
    return (
        <StyledView direction="row" gap={10}>
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
                    <StyledText style={{ fontWeight: 700,}} colorScheme={colorScheme}>{userName}-</StyledText>
                    <StyledText colorScheme={colorScheme}>{reviewDate}</StyledText>
                </StyledView>
                    <StyledText colorScheme={colorScheme}>3 more photos</StyledText>
                <StyledView style={{ textWrap: 'wrap', width: '90%' }}>
                    <StyledText style={{ flex: 1 }}>
                        {reviewText}
                    </StyledText>
                </StyledView>
            </StyledView>
           {shouldLink &&  <StyledView direction="row" align="flex-end" justify="flex-end" style={{ paddingLeft: 40}}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => router.push({ pathname: '/barbers/[id]/reviews', params: { id: 'TEST-BARBER-Reviews'}})}>
                    <StyledText style={{ color: '#007AFF' }} colorScheme={colorScheme}>All Reviews</StyledText>
                </TouchableOpacity>
            </StyledView>}

        </StyledView>
    )
}

export default UserReview;