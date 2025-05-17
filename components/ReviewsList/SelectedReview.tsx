import { TouchableOpacity } from "react-native";
import { StyledView, StyleText } from "../shared/SharedStyles";
import { Avatar } from "react-native-paper";
import { StarRatings } from "../shared/ratings/ratings";
import { router } from "expo-router";

interface IReview {
    reviewText: string;
    reviewRating: number;
    reviewDate: string;
    userName: string;
    userImage: string;
    shouldLink?: boolean;
}

const SelectedReview = ({
    reviewText, 
    reviewRating, 
    reviewDate, 
    userName, 
    userImage,
}: IReview) => {
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
                    <StyleText style={{ fontWeight: 700, fontSize: 15 }}>{userName} -</StyleText>
                    <StyleText>{reviewDate}</StyleText>
                </StyledView>
            </StyledView>
        </StyledView>
    )
}

export default SelectedReview;